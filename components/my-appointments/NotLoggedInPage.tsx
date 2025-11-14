import Link from 'next/link'
import { Button } from '../ui/button'
import { LogIn } from 'lucide-react'

function NotLoggedInPage() {
  return (
    <div className='text-center'>
        <p className='text-xl font-semibold text-accent mb-6'>Please Login To view & manage your appointments</p>
        <Button>
            <Link href={'/login'} className='flex items-center justify-center gap-2'>
                Log In
                <LogIn />
            </Link>
        </Button>
    </div>
  )
}

export default NotLoggedInPage