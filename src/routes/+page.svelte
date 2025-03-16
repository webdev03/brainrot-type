<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import createText from '$lib/generate-text';
	const FONTS = ['Kablammo', 'Comic Neue', 'Akronim', 'Just Me Again Down Here', 'Rubik Moonrocks'];
	const COLORS = ['blue', 'teal', 'green', 'red', 'orange'];

	const vineBoom = new Audio('/vine-boom.mp3');
	vineBoom.play();
	const getOut = new Audio('/tuco-get-out.mp3');

	let text = $state(createText());

	let typedText = $state('');
	let textToType = $state(text);

	let keyCount = $state(0);
	let c = $state(0); // counter to change the fonts

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) goto('/motion-warning');

		setInterval(() => ++c, 500); // change the fonts every 0.5 seconds
		addEventListener('keydown', (e) => {
			++keyCount;
			if (keyCount % 5 === 0) ++c; // set the fonts again
			if (e.key === textToType[0]) {
				typedText += textToType[0];
				textToType = textToType.slice(1);

				vineBoom.currentTime = 0;
				vineBoom.play();
				console.log('vineBoom');
			} else if (e.key.length === 1) {
				getOut.currentTime = 0;
				getOut.play();
				console.log('getOut');
			}
		});
	});
</script>

<!--
so that tailwind adds the colours to the generated css

text-blue-400
text-teal-400
text-green-400
text-red-400
text-orange-400
-->
<div
	class="flex h-screen w-screen flex-col justify-between bg-gray-800 font-[Comic_Neue] text-3xl text-white"
>
	<header class="flex items-center justify-center p-4">
		<img src="/favicon.png" alt="Amazing Logo" class="h-30 w-30" />
		<h1 class="ml-4 text-9xl">Brainrot Typer</h1>
	</header>
	<main class="flex flex-grow flex-col items-center justify-center text-center">
		<div class="inline text-gray-400">{typedText}</div>
		<div class="inline">
			{#each textToType.split(' ') as a}{#key c}
					<span
						class={`text-${COLORS[Math.floor(Math.random() * COLORS.length)]}-400`}
						style:font-family={FONTS[Math.floor(Math.random() * FONTS.length)]}>{a + ' '}</span
					>
				{/key}{/each}
		</div>
	</main>
	<footer class="justify-center p-4 text-center">
		<a class="underline underline-offset-4" href="https://github.com/webdev03/brainrot-type"
			>Made with 😭 by Devarsh and Luke</a
		>
	</footer>
</div>
