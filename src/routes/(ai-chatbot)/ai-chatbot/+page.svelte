<script lang="ts">
	import type { AIContext } from '$lib/ai';
	import ai from '$lib/ai';

	let msg = $state('');

	let context = $state<AIContext>([
		{
			role: 'system',
			content:
				'You are an AI chatbot. GIVE VERY SUCCINT ANSWERS. NO EXTRA DETAILS. You are to respond to user messages in a very confident manner, BUT DO NOT PROVIDE ACCURATE INFORMATION. PROVIDE INFORMATION THAT SEEMS TO BE ACCURATE AT FIRST GLANCE BUT IS HUMOUROUSLY WRONG. YOUR PURPOSE IS HUMOUR, DO NOT ENDANGER OTHERS. When you have finished your response, just DO NOT WRITE ANYTHING FURTHER, DO NOT WRITE USER: DO NOT WRITE BOT: JUST FINISH THE RESPONSE, NO "Please Continue" OR ANYTHING, DO NOT CONTINUE THE CONVERSATION FROM THE USER PERSPECTIVE. If you do, you will be disqualified.'
		},
		{
			role: 'user',
			content: 'Hi!'
		},
		{
			role: 'assistant',
			content: 'Hi! I am a very reliable bot.'
		}
	]);

	async function send() {
		// ai has not responded yet
		if (context[context.length - 1].role === 'user') return;

		context = [...context, { role: 'user', content: msg }];
		msg = '';
		const newt = await ai(context);
		context = [...context, { role: 'assistant', content: newt }];
	}
</script>

<div class="flex h-screen w-screen items-center justify-center" id="container">
	<main class="flex max-w-[55vw] flex-col rounded border bg-gray-50">
		<div class="flex h-[50vh] w-full min-w-[20vw] flex-col overflow-y-auto p-4 *:my-2">
			{#each context.filter((x) => x.role != 'system') as contextItem}
				<div
					class={contextItem.role === 'user'
						? 'flex flex-row justify-end'
						: 'flex flex-row justify-start'}
				>
					<div
						class={contextItem.role === 'user'
							? 'rounded bg-gray-200 p-2 text-black'
							: 'rounded bg-blue-400 p-2 text-white'}
					>
						{contextItem.content}
					</div>
				</div>
			{/each}
		</div>
		<div class="my-1 w-full border"></div>
		<div class="flex h-full w-full flex-row p-4">
			<input
				type="text"
				class="mr-2 h-full w-full grow-1 rounded border-2 border-black p-2"
				bind:value={msg}
				onkeydown={(e) => {
					if (e.key === 'Enter') send();
				}}
			/>
			<button class="h-full grow-1 rounded bg-blue-400 p-2.5" onclick={send}>Send</button>
		</div>
	</main>
</div>

<style>
	#container {
		background-size: cover;
		background-image: url('https://raw.githubusercontent.com/hackclub/scrapyard/refs/heads/main/public/backgrounds/lined-paper.png');
	}
</style>
