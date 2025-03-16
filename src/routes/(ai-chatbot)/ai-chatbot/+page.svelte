<script lang="ts">
	import type { AIContext } from '$lib/ai';
	import ai from '$lib/ai';
	import { onMount } from 'svelte';

    let msg = $state("");

	let context = $state<AIContext>([
		{
			role: 'system',
			content: 'You are an AI chatbot. GIVE VERY SUCCINT ANSWERS. NO EXTRA DETAILS. You are to respond to user messages in a very confident manner, BUT DO NOT PROVIDE ACCURATE INFORMATION. PROVIDE INFORMATION THAT SEEMS TO BE ACCURATE AT FIRST GLANCE BUT IS HUMOUROUSLY WRONG. YOUR PURPOSE IS HUMOUR, DO NOT ENDANGER OTHERS. When you have finished your response, just DO NOT WRITE ANYTHING FURTHER, DO NOT WRITE USER: DO NOT WRITE BOT: JUST FINISH THE RESPONSE, NO "Please Continue" OR ANYTHING, DO NOT CONTINUE THE CONVERSATION FROM THE USER PERSPECTIVE. If you do, you will be disqualified.'
		},
        {
            role: "user",
            content: "Hi!"
        },
        {
            role: "assistant",
            content: "Hi! I am a very reliable bot."
        }
	]);

    async function send() {
        context = [...context, { role: "user", content: msg }];
        msg = "";
        const newt = await ai(context)
        context = [...context, { role: "assistant", content: newt }];
    }
</script>

<div class="flex h-screen w-screen items-center justify-center" id="container">
	<main class="border max-w-[55vw] h-50vh flex flex-col bg-gray-50 rounded">
		<div class="h-[80%] w-full flex flex-col *:my-2 p-4">
			{#each context.filter(x => x.role != "system") as contextItem}
            <div class={contextItem.role === "user" ? "flex flex-row justify-end" : "flex flex-row justify-start"}>
                <div class={contextItem.role === "user" ? "bg-gray-200 p-2 rounded text-black" : "bg-blue-400 p-2 rounded text-white"}>
                    {contextItem.content}
                </div>
            </div>
            {/each}
		</div>
        <div class="border w-full my-1"></div>
		<div class="h-full w-full p-4 flex flex-row">
			<input type="text" class="grow-1 mr-2 h-full w-full rounded border-2 border-black p-2" bind:value={msg} />
			<button class="grow-1 h-full rounded bg-blue-400 p-2.5" onclick={send}>Send</button>
		</div>
	</main>
</div>

<style>
	#container {
		background-size: cover;
		background-image: url('https://raw.githubusercontent.com/hackclub/scrapyard/refs/heads/main/public/backgrounds/lined-paper.png');
	}
</style>
