<template>

	<v-card class="overflow-hidden" height="56">
		<v-app-bar color="rgb(66, 133, 221)" dark >
			<v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

			<v-toolbar-title> <v-btn to="/" >Efood</v-btn></v-toolbar-title>
			<v-spacer />

            <v-btn to="Register" color="white" text rounded class="my-2 right-btn">Register</v-btn>
            <v-btn to="#" color="white" text rounded class="my-2 right-btn">Login</v-btn>

		</v-app-bar>

		<v-navigation-drawer v-model="drawer" app clipped temporary>
			<v-list nav dense>
				<v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
					<v-list-item v-for="page in pages" :key="page" :to="`${page.link}`">
					<v-list-item-title>{{page.title}}</v-list-item-title>
                    </v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</v-card>
</template>

<script>

export default {
    name: "Navbar",
    
    data: () => ({
        drawer: false,
        group: null,
        pages:[
                {
                    title: "Home",
                    link:"/",
                },
                {
                    title: "Menu",
                    link:"Menu",
                },
                {
                    title: "Booking",
                    link:"Booking",
                },
        ],
    }),
	
};
</script>

<style scoped>
.right-btn{
    margin:10px;
}


</style>

