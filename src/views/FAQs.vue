<template>

<v-expansion-panels>
<h1>Frequently Asked Questions</h1>
<v-expansion-panel v-for="question in questions" :key="question">
<v-expansion-panel-header style="text-align:center">{{question.q}}</v-expansion-panel-header>
<v-expansion-panel-content>{{question.a}}</v-expansion-panel-content>
</v-expansion-panel>
</v-expansion-panels>
</template>

<script>
export default {
	data: () => ({

		questions:[
			{
				q:"How do you create a booking?",
				a:"To create a booking ensure you are logged in and then navigate to the bookin tab then follow the instructions",
			},
			{
				q:"Can I create a booking without an account?",
				a:"No, you must have an account in order to create a booking",
			},
			{
				q:"Help! I have forgotten my password",
				a:"Don't worry, navigate to the login page and click on 'Forgot Password'.",
			}

		],
	}),
};
</script>
