import { Button } from '../ui/button';
import { useAuthStore } from '@/stores/useAuthStore';

const Logout = () => {
    const {signOut} = useAuthStore();
    const handleLogout = async () =>{
        try {
            await signOut();
            // Sử dụng window.location để refresh toàn bộ trang
            window.location.href = "/signin";
        } catch (error){
            console.error(error);
            // Vẫn redirect ngay cả khi có lỗi
            window.location.href = "/signin";
        }
    }


  return (
    <Button onClick = {handleLogout} className="h-10 text-base px-4">Logout</Button>
  )
}

export default Logout;
