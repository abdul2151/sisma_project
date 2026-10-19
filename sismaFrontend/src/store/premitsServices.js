import {defineStore} from 'pinia'
import axios from 'axios'
import {ref} from 'vue'


export const premits = defineStore('premits',{
    state:()=>{
        const endpointPremits ='http://localhost:8000/premits'
        const payload=[]
        const allDataPremits=[]
        const responsedataHistoryById=[];
        const dataResponseAcceptPremits=[];
        const statusUpdate=ref('')
        const statuspayload = false
        const payloadViewPremits=ref('')
        const dataFilterSelected=null
        return{dataFilterSelected,dataResponseAcceptPremits,allDataPremits,endpointPremits,payload,statuspayload,statusUpdate,payloadViewPremits,responsedataHistoryById}
    },
    actions:{
        async getPremits(){
            const dataPremits = await axios.get(this.endpointPremits)
            if(dataPremits){
                this.allDataPremits=dataPremits.data
            }
        },
        async newPremits(namaa,nim,clas,kontent,matakuliah,datedata,dataUser){
             const responstPostPremits = await axios.post('http://localhost:8000/premits/user/post',{
                nama:namaa,
                nimMhs:nim,
                kelas:clas,
              content:kontent,
                matkul:matakuliah,
                datenow:datedata,
                IdMahasiswa:dataUser
            })
            if(!responstPostPremits){
                alert('invalid to post premits')
            }
            else{
                alert('suskes to post premits')
            }
        },
        async deletePremits(id){
            const deletePremits=await axios.delete(`http://localhost:8000/premits/user/delete/${id}`)
            if(!deletePremits){
                alert('invalid to delete premits')
            }
            else{
                alert('sukses to delete premits')
                window.location.reload()
            }
        },
        async updatePremits(idUser,namaa,nim,clas,kontent,matakuliah,datedata,idPremits){
            const updatePremits=await axios.post(`http://localhost:8000/premits/user/update/${idPremits}`,{
                nama:namaa,
                nimMhs:nim,
                kelas:clas,
              content:kontent,
                matkul:matakuliah,
                datenow:datedata,
                objectid:idUser
            })
            if(!updatePremits){
                alert('invalid to update premits')
                this.statusUpdate=false
                window.location.reload()
            }
            else{
                this.statusUpdate=true                
            }
        },
        async getPremitsById(id){
            const viewPremits=await axios.get(`http://localhost:8000/premits/user/detail/${id}`)
            this.payloadViewPremits=viewPremits.data
            if(!viewPremits){
                alert('invalid to view premits')
                window.location.reload()
            }
            else{
              console.log(this.payloadViewPremits)
            }
        },
        async getPremitsByIdUser(){
            const dataId= localStorage.getItem('id')
                 const response =await axios.get(`http://localhost:8000/premits/user/${dataId}`)
                if(response){
                    this.payload=response.data
                }
            },
        getDataFilter(data){
            this.dataFilterSelected=data
        },
        async pushAcceptDataPremits(iduser){
            const urlEndpoint='http://localhost:8000/premits/admin/pushData'
            const mataKuliah =[
                {nama:'jaringan Komputer',dosenPengampu:'cecep warman m.kom'},
                {nama:'enterprise Architecture Integrations',dosenPengampu:'sudin saepudin m.kom'},
                {nama:'manajemen proses bisnis',dosenPengampu:'sudin saepudin m.kom'},
                {nama:'proyek perangkat lunak',dosenPengampu:'muhammad muslih. ST, M.kom'},
                {nama:'metode penelitian',dosenPengampu:'rieska ayuningsih.ST, M.kom'},
              ]
              mataKuliah.map(data=>{
                const matchData=data.nama.toLowerCase().includes(this.dataFilterSelected)
                if(!matchData){
                    console.log('invalid match data')
                }
                else{
                    console.log('invalid')
                }
              })
            const response=await axios.post(urlEndpoint,{id:iduser})
            if(response){
                alert('sukses to push data premits')
                window.location.reload()
            }
            else{
                alert(response.err)
            }
        },
        async getPremitsAccept(){
            const urlEndpoint='http://localhost:8000/premits/admin'
            const response = await axios.get(urlEndpoint)
            if(response){
                this.dataResponseAcceptPremits=response.data
            }
            else{
                alert('invalid get accept premits')
            }
        }
    }
})