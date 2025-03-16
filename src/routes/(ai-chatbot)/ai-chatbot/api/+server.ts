import { HUGGINGFACE_API_KEY } from '$env/static/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	return await fetch("https://router.huggingface.co/hf-inference/models/google/gemma-2-2b-it", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + HUGGINGFACE_API_KEY,
        },
        body: await request.text()
    });
};