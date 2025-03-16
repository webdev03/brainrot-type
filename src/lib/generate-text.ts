export const CUSTOM_PROMPTS: string[] = [
	'skibidi',
	'gyatt',
	"you're so rizzy",
	'rizzler',
	'ohio',
	'pog',
	'looksmaxxing',
	'poggers',
	'cringe',
	'based',
	'redacted',
	'kai cenat',
	'sus',
	'among us',
	'drip',
	'lit',
	'fire',
	'bruh',
	'bruh moment',
	'bruh sound effect',
	'VINE BOOM!!!',
	'violated',
	'bro just got violated',
	'subway surfers tiktok attention span',
	'attention span of a goldfish',
	'stop it, get some help',
	"you're so rizzy",
	'yeet',
	'yeetification',
	'yeetify',
	'fanum tax'
];

import WORDS from './words.json';

export function getWord() {
	if (Math.random() > 0.8) {
		return CUSTOM_PROMPTS[Math.floor(Math.random() * CUSTOM_PROMPTS.length)];
	}
	return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export default function createText(): string {
	const TOTAL_WORD_COUNT = 200;
	let prompt = '';
	while (prompt.split(' ').length < TOTAL_WORD_COUNT) {
		prompt += ' ' + getWord();
	}
	return prompt.trim();
}
