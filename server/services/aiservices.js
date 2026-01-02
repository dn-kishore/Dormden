require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");

const geminiApiKey = process.env.GEMINI_API_KEY;
const pineconeApiKey = process.env.PINECONE_API_KEY;
const pineconeIndexName = process.env.PINECONE_INDEX;

let ai = null;
let pinecone = null;
let index = null;

// Initialize AI services
if (geminiApiKey) {
    ai = new GoogleGenAI({ apiKey: geminiApiKey });
} else {
    console.warn("WARNING: GEMINI_API_KEY is not defined. AI features will be limited.");
}

if (pineconeApiKey && pineconeIndexName) {
    const { Pinecone } = require("@pinecone-database/pinecone");
    pinecone = new Pinecone({ apiKey: pineconeApiKey });
    index = pinecone.index(pineconeIndexName);
} else {
    console.warn("WARNING: PINECONE_API_KEY or PINECONE_INDEX is not defined. Vector search will be unavailable.");
}

/**
 * Check AI service status
 */
function checkAIStatus() {
    return {
        gemini: !!geminiApiKey,
        pinecone: !!(pineconeApiKey && pineconeIndexName)
    };
}

/**
 * Helper function to retry API calls with exponential backoff
 */
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 5000) {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
        try {
            return await fn();
        } catch (error) {
            lastError = error;
            if (error.status === 429 && i < maxRetries - 1) {
                const delay = initialDelay * Math.pow(2, i);
                console.log(`Rate limited. Retrying in ${delay/1000}s... (attempt ${i + 2}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
    throw lastError;
}

/**
 * Generate embedding for text
<<<<<<< HEAD
=======
 * Using outputDimensionality: 3072 to match Pinecone index dimension
>>>>>>> 0c47ffa (second commit)
 */
async function generateEmbedding(text) {
    if (!ai) throw new Error("Gemini API not configured");
    
    try {
        const response = await ai.models.embedContent({
            model: "text-embedding-004",
<<<<<<< HEAD
            contents: text
=======
            contents: text,
            outputDimensionality: 3072
>>>>>>> 0c47ffa (second commit)
        });
        return response.embeddings[0].values;
    } catch (error) {
        console.error("Error generating embedding:", error);
        throw error;
    }
}

/**
 * Extract rules from PDF using AI (with fallback to basic extraction)
 */
async function extractRulesFromPDF(pdfBuffer) {
    // Convert buffer to base64
    const buffer = Buffer.isBuffer(pdfBuffer) ? pdfBuffer : Buffer.from(pdfBuffer);
    
    console.log("PDF buffer size:", buffer.length, "bytes");

    // Try AI extraction first, fallback to basic extraction if quota exceeded
    if (ai) {
        try {
            const base64Data = buffer.toString('base64');

            const prompt = `
                You are an expert at extracting structured information from hostel/PG house rules documents.
                
                Analyze the PDF document and extract all rules.
                For each rule, provide:
                - title: A short title for the rule
                - description: The full description of the rule
                - clause: The clause reference if mentioned (e.g., "House Rules - Clause 4")
                
                Return ONLY a JSON array of rules. Example format:
                [
                    {
                        "id": "r1",
                        "title": "Gate Timing",
                        "description": "Main gate closes at 10:30 PM. Late entry requires prior approval.",
                        "clause": "House Rules – Clause 4"
                    }
                ]
                
                Do not include markdown formatting like \`\`\`json.
            `;

            const response = await retryWithBackoff(async () => {
                return await ai.models.generateContent({
                    model: "gemini-2.5-flash",
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    inlineData: {
                                        mimeType: "application/pdf",
                                        data: base64Data
                                    }
                                },
                                { text: prompt }
                            ]
                        }
                    ]
                });
            });
            
            const text = response.text.replace(/```json|```/g, '').trim();
            console.log("AI response:", text.substring(0, 200));
            
            const rules = JSON.parse(text);
            
            return rules.map((rule, idx) => ({
                ...rule,
                id: rule.id || `r${idx + 1}`
            }));
        } catch (error) {
            // If quota exceeded (429) or invalid PDF (400), fall back to basic extraction
            if (error.status === 429 || error.status === 400) {
                console.log(`AI error (${error.status}), using basic PDF extraction...`);
                return await extractRulesBasic(buffer);
            }
            throw error;
        }
    } else {
        // No AI configured, use basic extraction
        return await extractRulesBasic(buffer);
    }
}

/**
 * Basic PDF text extraction without AI (fallback)
 */
async function extractRulesBasic(pdfBuffer) {
    try {
        // Try pdf-parse first
        const pdfParse = require('pdf-parse');
        const pdfData = await pdfParse(pdfBuffer);
        const text = pdfData.text;
        
        console.log("Basic extraction - PDF text length:", text.length);
        
        return parseTextToRules(text);
    } catch (error) {
        console.log("pdf-parse failed, trying manual extraction...");
        
        // Fallback: Try to extract text directly from buffer
        const text = pdfBuffer.toString('utf8');
        
        // Look for readable text patterns in the buffer
        const readableText = text.match(/[\x20-\x7E\n\r]+/g);
        if (readableText && readableText.length > 0) {
            const combinedText = readableText
                .filter(t => t.trim().length > 10)
                .join(' ');
            
            if (combinedText.length > 50) {
                console.log("Extracted text from buffer, length:", combinedText.length);
                return parseTextToRules(combinedText);
            }
        }
        
        // If all else fails, return placeholder rules
        console.log("Could not extract text, returning placeholder rules");
        return [
            {
                id: 'r1',
                title: 'PDF Uploaded',
                description: 'PDF document was uploaded successfully. AI extraction will process rules when quota is available.',
                clause: 'Pending AI Processing'
            }
        ];
    }
}

/**
 * Parse text into rules structure
 */
function parseTextToRules(text) {
    const rules = [];
    const lines = text.split(/[\n\r]+/).filter(line => line.trim());
    
    let currentRule = null;
    let ruleCount = 0;
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Look for numbered items, bullet points, or capitalized headers
        const isHeader = /^(\d+[\.\)]\s*|•\s*|[-–]\s*|[A-Z][A-Z\s]+:)/.test(trimmed);
        
        if (isHeader && trimmed.length > 5) {
            if (currentRule) {
                rules.push(currentRule);
            }
            ruleCount++;
            currentRule = {
                id: `r${ruleCount}`,
                title: trimmed.replace(/^(\d+[\.\)]\s*|•\s*|[-–]\s*)/, '').substring(0, 50),
                description: trimmed,
                clause: `Extracted Rule ${ruleCount}`
            };
        } else if (currentRule && trimmed.length > 10) {
            currentRule.description += ' ' + trimmed;
        }
    }
    
    if (currentRule) {
        rules.push(currentRule);
    }
    
    // If no rules found, create a single rule with all text
    if (rules.length === 0 && text.length > 0) {
        rules.push({
            id: 'r1',
            title: 'House Rules',
            description: text.substring(0, 5.00).trim(),
            clause: 'Full Document'
        });
    }
    
    console.log(`Parsed ${rules.length} rules from text`);
    return rules;
}

/**
 * Answer Warden Bot questions using RAG
 */
async function answerWardenQuestion(question, listingId, listingContext, history = []) {
    if (!ai) throw new Error("Gemini API not configured");
    
    try {
        let contextText = '';
        
<<<<<<< HEAD
        // If Pinecone is configured, do semantic search
        if (index && listingId) {
            const queryVector = await generateEmbedding(question);
            
            const filter = listingId ? { listingId: listingId } : { type: 'hostel-rule' };
            
            const queryResponse = await index.query({
                vector: queryVector,
                topK: 5,
                includeMetadata: true,
                filter
            });

            const matches = queryResponse.matches || [];
            if (matches.length > 0) {
                contextText = matches.map(match => match.metadata.text).join("\n\n");
=======
        // If Pinecone is configured, try semantic search (but don't fail if dimension mismatch)
        if (index && listingId) {
            try {
                const queryVector = await generateEmbedding(question);
                
                const filter = listingId ? { listingId: listingId } : { type: 'hostel-rule' };
                
                const queryResponse = await index.query({
                    vector: queryVector,
                    topK: 5,
                    includeMetadata: true,
                    filter
                });

                const matches = queryResponse.matches || [];
                if (matches.length > 0) {
                    contextText = matches.map(match => match.metadata.text).join("\n\n");
                }
            } catch (pineconeError) {
                // Log but don't fail - we can still answer using listing context
                console.warn("Pinecone search skipped (dimension mismatch or other error):", pineconeError.message);
>>>>>>> 0c47ffa (second commit)
            }
        }
        
        // Add listing-specific context if available
        if (listingContext) {
            const listingInfo = `
                Hostel: ${listingContext.name}
                Location: ${listingContext.location}, ${listingContext.city}
                Curfew: ${listingContext.highlights?.curfew || 'Not specified'}
                Guests Allowed: ${listingContext.highlights?.guests ? 'Yes' : 'No'}
                Pets Allowed: ${listingContext.highlights?.pets ? 'Yes' : 'No'}
                Self Cooking: ${listingContext.highlights?.cooking ? 'Yes' : 'No'}
                Amenities: ${listingContext.amenities?.join(', ') || 'Not specified'}
            `;
            contextText = listingInfo + "\n\n" + contextText;
            
            // Add rules from listing if not from vector search
            if (listingContext.rules && listingContext.rules.length > 0) {
                const rulesText = listingContext.rules.map(r => 
                    `${r.title}: ${r.description}`
                ).join("\n");
                contextText += "\n\nHouse Rules:\n" + rulesText;
            }
        }

        // Format conversation history
        const historyText = history.map(msg => {
            const role = msg.role === 'user' ? 'User' : 'Warden Bot';
            return `${role}: ${msg.content}`;
        }).join("\n");

        const prompt = `
            You are the Warden Bot for DormDen, a helpful assistant that answers questions about hostel/PG rules and policies.
            
            Be friendly, helpful, and concise. If you don't have specific information, provide general guidance about typical hostel policies.
            
            ${contextText ? `Context about this hostel:\n${contextText}\n\n` : ''}
            ${historyText ? `Conversation History:\n${historyText}\n\n` : ''}
            
            User Question: ${question}
            
            Provide a helpful answer:
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        return response.text;
    } catch (error) {
        console.error("Error answering warden question:", error);
        throw new Error("Failed to generate answer");
    }
}

/**
 * Generate hostel description using AI
 */
async function generateHostelDescription(name, amenities, vibe) {
    if (!ai) throw new Error("Gemini API not configured");
    
    const prompt = `
        You are an expert at writing compelling hostel/PG descriptions.
        Write a catchy, appealing description (max 100 words) for:
        
        Hostel Name: ${name}
        Amenities: ${amenities.join(', ')}
        Vibe: ${vibe}
        
        Make it sound welcoming and highlight the key features.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });
        return response.text;
    } catch (error) {
        console.error("Error generating description:", error);
        return "Description unavailable";
    }
}

module.exports = {
    checkAIStatus,
    generateEmbedding,
    extractRulesFromPDF,
    answerWardenQuestion,
    generateHostelDescription
};
