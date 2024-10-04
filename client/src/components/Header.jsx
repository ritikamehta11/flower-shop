import Navbar from "./Navbar";

export default function Header(){
  return (
    <header className='flex flex-wrap gap-5 flex-row justify-evenly basis-1/5' >
      <div>Logo</div>
      <Navbar />
      
    </header>
  )
};