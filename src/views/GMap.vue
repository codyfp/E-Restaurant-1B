    <template>
    <div class="map">
        <div class="google-map" id="map"></div>
    </div>
</template>

<script>
export default {
    name: "GMap",
    data(){
        return {
            lat: -33.865143,
            lng: 151.209
        }
    }, 
   methods: {
        renderMap(){
                const map = new google.maps.Map(document.getElementById('map'), {
                    center:{lat: this.lat, lng: this.lng},
                    zoom: 11,
                    maxZoom: 25,
                    minZoom: 8,
                    streetViewControl: false
                })

            }
        },
    mounted(){
        if( navigator.geolocation){
            navigator.geolocation.getCurrentPosition(pos => {
                this.lat = pos.coords.latitude
                this.lng = pos.coords.longitude
                this.renderMap()
                }, (err) => {
                    console.log(err)
                    this.renderMap()
                }, {maximumAge: 60000, timeout:3000})
            }else {
            this.renderMap()
            }
            
        }
    }
</script>

<style scoped>
.google-map{
    width: 100%;
    height: 
    70%;
    margin: 0 auto;
    background: fff;
    position: absolute;
    top: 0;
    left:0;
}
</style>
   
