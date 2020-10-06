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

                var marker = new google.maps.Marker({
                position: {lat: -33.8152, lng: 151.0093},
                map: map,
                title: 'Doctor Demo (Dentist)'
            })
            
                var marker = new google.maps.Marker({
                position: {lat: -33.8158, lng: 151.0098},
                map: map,
                title: 'Doctor Can (Dentist)'
            })
            var marker2 = new google.maps.Marker({
                position: {lat: -33.967, lng: 150.981},
                map: map,
                title: 'Doctor Dwayne Johnson'
            })
            var marker2 = new google.maps.Marker({
                position: {lat: -33.7961, lng: 151.1780},
                map: map,
                title: 'Doctor Phill'
            })
            var marker2 = new google.maps.Marker({
                position: {lat: -33.865143, lng: 151.209900},
                map: map,
                title: 'Doctor Darshan'
            })
            var marker2 = new google.maps.Marker({
                position: {lat: -33.9646, lng: 151.1010},
                map: map,
                title: 'Doctor Greg'
            })

             var marker2 = new google.maps.Marker({
                position: {lat: -33.9495, lng: 151.2437},
                map: map,
                title: 'Doctor Andrews'
            })
             var marker2 = new google.maps.Marker({
                position: {lat: -34.0299, lng: 151.1055},
                map: map,
                title: 'Doctor Mary'
            })
              var marker2 = new google.maps.Marker({
                position: {lat: -33.7668, lng: 150.9053},
                map: map,
                title: 'Doctor Singh'
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
   
