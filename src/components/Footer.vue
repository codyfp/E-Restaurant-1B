<template>
	<v-footer color="primary lighten-1" padless>
		<v-row justify="center" no-gutters>
			<v-btn v-for="link in links" :key="link" color="white" text rounded class="my-2" :to="`${link.link}`">{{ link.title }}</v-btn>
			<v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
				{{ new Date().getFullYear() }} —
				<strong>SES-G1</strong>
			</v-col>
		</v-row>
	</v-footer>
</template>

<script>
export default {
	name: "Footer",
	data: () => ({
		links: [
			{
				title:"Home",
				link:"/"
			}, 
			{
				title:"About Us",
				link:"About",
			},
			{
				title:"FAQ",
				link:"FAQs",
			},
			{
				title:"Staff Portal",
				link:"Staff"}
			],
	}),
};
</script>

<style scoped>
</style>