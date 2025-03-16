<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="p-3">
	<h1 class="text-3xl font-bold">Hello there!</h1>
	<p>You've been sent here because your browser has prefers-reduced-motion.</p>
	<p>This project has lots of flashing colours, and we do not want to harm you.</p>
	<p>
		<a href="/brainrot-typer" class="text-blue-400 underline"
			>If you would like to continue, please disable that and click here to continue.</a
		>
	</p>
</div>
