export type AIContext = {
	role: 'user' | 'system' | "assistant";
	content: string;
}[];

export default async function ai(context: AIContext) {
    const prompt = context.map(x => {
        if(x.role === "assistant") {
            return "BOT: " + x.content;
        }
        if(x.role === "user") {
            return "USER: " + x.content;
        }
        return "SYSTEM (VERY IMPORTANT): " + x.content;
    }).join("\n") + "\nBOT: ";
	const req = await fetch('/ai-chatbot/api', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			inputs: prompt
		})
	});
    return ((await req.json())[0].generated_text as string).slice(prompt.length).trim().split("USER:")[0].trim();
}
