
Vue.component("reservation",{
  props:["veh","veh0","veh1","answer3","price", "numberdays", "dodaci"],
  data: function(){
     return{     
        selected1: '',
        selected2: '',
        selected3: '',
        dodatak1: 0,
        dodatak2: 0,
        dodatak3: 0,
        punacena:0,
        checkButton2:false
     }
  },
   template:` 
       <div>
          <p><b>Izabrali ste vozilo  {{veh0}}</b> </p> 
          <p ><img class="small-pic" :src="reserveImage(veh1)" alt=""><p>
          <p>Korišćenja vozila : {{answer3}}  </p>   
          
          <p> <b>Cena vozila za  {{numberdays}} dan/a:<span style="color:rgb(159, 185, 43); font-size:18px;" > {{punacena}} $ </span> <b> </p>                               
          <div style="display:flex">
            <p>Dodatne opcije :<p> 
            <b-button size="sm" @click="fullprice" v-show="checkButton2">Proveri</b-button> 
          </div>
                                  
                       
         
          <div class="check-inline">
          <b-form-checkbox  id="checkbox-1" v-model="selected1" name="checkbox-1" value=" +  3$/dan"  unchecked-value="" class="check-padding"> GPS Navigacija</b-form-checkbox>
            {{ selected1 }}   
           </div>  

          <div class="check-inline">
          <b-form-checkbox  id="checkbox-2" v-model="selected2" name="checkbox-2" value=" +  20$"  unchecked-value="" class="check-padding">Prelazak granice</b-form-checkbox>
               
               {{ selected2 }}
          </div> 
          <div class="check-inline">
          <b-form-checkbox  id="checkbox-3" v-model="selected3" name="checkbox-3" value=" +  25$/dan"  unchecked-value="" class="check-padding"> Lični vozač</b-form-checkbox>
           {{ selected3 }}  
          </div> 
                 
        </div>
   `,
 
  methods:{
    reserveImage: function(veh1){
       return "." + veh1;       
    } ,
  },
  computed:{
  
    fullprice: function(){
      if(this.selected1 !==""){
        this.dodatak1=this.numberdays*3
      }else{
        this.dodatak1=0
      }
      if(this.selected2 !==""){
        this.dodatak2=20
      }else{
        this.dodatak2=0
      }
      if(this.selected3 !==""){
        this.dodatak3=this.numberdays*25
      }else{
        this.dodatak3=0
      }
      
      this.punacena=this.price + this.dodatak3 + this.dodatak2 + this.dodatak1;
      //console.log(this.dodatak1)
    }
  }
  })

  
//<img class="small-img" :src=""   alt="" />  
Vue.component("cars",{
  props:["car"],
  data: function(){
     return{
       
     }
  },
   template:`
     <div class="car-gallery" >   
         <div  :class="{'opacityCar':car.visible==0}">               
               <img class="car-pic" :src=car.picture />
               <p  class="vehicle1"> <b>{{car.care}}  {{car.model}} </b></p>             
               <p class="vehicle1" style="font-size:12px"> Godina proizvodnje:   {{car.year}} </p>  </p>
               <div class="cars-grid">
                   <p class="vehicle1">Cena/dan:  <b>{{car.price}} $ </b></p>  
                   <button :class="{'cars-flex':car.visible==1, 'cars-flexdisabled':car.visible==0}"  @click="carReservation(car)"  href="#section5" :disabled="car.visible==0" >             
                          <p class="full-center" >{{car.visible==0 ? "Rezervisano" : "Rezerviši"}} </p>                                             
                         <i  class="fas fa-chevron-right marg"></i>  
                                           
                   </button>
                   

               <div>
         </div>
         
     </div>
  `,
  methods:{
    carReservation: function(veh){
        this.$emit("reservation-setup",veh);
       
    }   
  },

});


const app=new Vue({

    el:"#app",
    data:{
        reserveAvailable:false,
        cars:[],
        show: true,
        selectedDate: null ,
        fromvalue:'',
        tovalue:'', 
        formatted: '',
        selected: '',
        value:"",
        context: null,
        showCale:false,
        answer:"",
        answer2:"",
        answer3:"",
        price: 0,
        reservationMenu:false,
        veh0:"",
        veh1:"",
        numberdays:1,
        veh:"",
        checkButton:false,
        dodaci:false,
        formEntry:[],
        
        form: {
          email: '',
          name: '',
          phone:'',
          checked: ''
        },
        
             
    },  
    computed:{
      checkvehicle: function(){   
        var date1 =Math.round(new Date(this.fromvalue).getTime()/ (1000 * 3600 * 24)); 
        var date2 =Math.round(new Date(this.tovalue).getTime()/ (1000 * 3600 * 24)); 
        var day1=new Date(this.fromvalue).getDate();
        var day2=new Date(this.tovalue).getDate();
        var month1=new Date(this.fromvalue).getMonth()+1;
        var month2=new Date(this.tovalue).getMonth()+1;
        var year1=new Date(this.fromvalue).getFullYear();
        var year2=new Date(this.tovalue).getFullYear();
      
        //var Difference_In_Days = date2 - date1;   
         this.answer2="";   
         var datum1= day1+"."+ month1 +"."+year1;
         var datum2= day2+"."+ month2 +"."+year2;
         this.answer3=   datum1+ " - " +  datum2 
          if( this.fromvalue=="" || this.tovalue=="" ) {         
          this.answer="*Izaberite datume"}
          else if( date1>date2){
            this.answer="",
            this.answer="*Datum vraćanja mora biti nakon preuzimanja"}
          else{             
            this.reserveAvailable=true;
            var numberdays=date2-date1;
            this.numberdays=numberdays;
            this.answer= "Izabrali ste korišćenje vozila na  " + numberdays+ "  dana. Izaberite vozilo!";
            this.reservationMenu=false;
            for(car of app.cars){
                for(i=0; i<car.reserved.length;i++){
                     for(j=date1; j<=date2 ; j++){
                         if(j==car.reserved[i] & car.visible===1){
                          car.visible-- }
                          else{
                           if(car.visible[i]==0){
                            car.visible++;
                          }
                       }
                      }            
                   }             
                }                     
           };        
      },
      
    },
    
  
    
    methods:   {
      onContext(ctx) {
        // The date formatted in the locale, or the `label-no-date-selected` string
        this.formatted = ctx.selectedFormatted
        // The following will be an empty string until a valid date is entered
        this.selected = ctx.selectedYMD
      
      
    },
      
    
      dateDisabled(ymd, date) {
     // const weekday = date.getDay();
        const day =Math.ceil( date.getTime()/ (1000 * 3600 * 24));
       /* if(weekday === 0 || weekday === 6) {
             return true
        }*/
        // I want to detect the target here.
        const d=new Date()
        const todayDate=Math.ceil(d.getTime()/ (1000 * 3600 * 24));
        if(day+1<todayDate){
          return true
        }
      //  console.log(todayDate)
    },

    carReservation:function(veh){
      if(this.reserveAvailable==false){
        this.answer2="*Morate izabrati datum preuzimanja i vraćanja vozila"
        this.answer=""
        window.location.href="#section5";
      } else{
      
      this.reservationMenu=true;
      this.veh0=veh.care + "  " + veh.model ;
      this.veh1=veh.picture;
      this.price=veh.price*this.numberdays;
      this.answer="";
      //console.log(veh.care);
      //console.log(veh.visible);
      window.location.href="#section6";
       }
       
      
    },
    


    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
      this.formEntry.push(JSON.stringify(this.form))
      console.log(this.formEntry)
      
/* axios({
        method: 'post',
        url: './data.json',
        data: {
          name: 'Fred',
          email: 'Flintstone'
        }
      });*/


    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.phone = ''
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    
    

    }

})

axios({
  method: 'get', 
  url: './cars1.json',
  responseType: 'json'
}).then(function (response) {
      
      app.cars= response.data;
    
  });


