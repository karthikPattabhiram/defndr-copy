"use client"
import Image from 'next/image'
import { callback, getUser} from "../../../../discord"
import discordOauth2 from 'discord-oauth2';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
import Loadingpage from '@/app/components/Loadingpage';
import Discordpage from '@/app/components/Discordpage';
import Connectwalletpage from '@/app/components/Connectwalletpage';
import { useState , useEffect} from 'react'


export default async function Page () {
  
  const codeParams = useSearchParams()
  const code = codeParams.get('code')
    const router = useRouter()


  const loadData = async () => {
    const resolvedData = await callback(code)
    const userData = await getUser(resolvedData.access_token)
    sessionStorage.setItem("data", JSON.stringify(userData) )
  }

  const [IsLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 5000);

        useEffect(() => {
          const user = sessionStorage.getItem("data")

          if (user) return
          
            loadData(); 

        }, []);

  
    
    if (IsLoading) {
      return <Loadingpage loadingText="Redirecting, please wait.." />;
    } else {  
            router.push("/verify")
    }
    
  
}
