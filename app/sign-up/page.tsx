import {React , useState} from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
// import Link from 'next/Link';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



function Signup() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setpassword] = useState("")
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState("")
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState("")

    const router = useRouter()

    async function submit(e:React.FormEvent){
        e.preventDefault();
        if (!isLoaded) {  
            return null
        }

        try{
            await signUp.create({
                emailAddress,
                password
            });

            await signUp.prepareEmailAddressVerification({
                strategy : "email_code"
            })

            setPendingVerification(true)
        }
        catch(error:any){
            console.log(JSON.stringify(error , null ,2));
            setError(error.errors[0].message)            
        }
    }


    async function onPressVerify(e:React.FormEvent){
        e.preventDefault();
        if (!isLoaded) {  
            return null
        }

        try{ 
            const completeSignup = await signUp.attemptEmailAddressVerification({code})

            if(completeSignup.status !== "complete"){
                console.log(JSON.stringify(completeSignup , null ,2));
            }

            if(completeSignup.status === "complete"){ 
                await setActive({session: completeSignup.createdSessionId})
                router.push("/dashboard")
            }
        }
        catch(error:any){
            console.log(JSON.stringify(error , null ,2));
            setError(error.errors[0].message)            
        }
    }

    return(
        <>
        </>
    )
}

export default Signup
 