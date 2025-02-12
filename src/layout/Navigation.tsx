import { IoHome } from 'react-icons/io5';
import { Link } from 'react-router';
import { RiQuestionAnswerFill } from 'react-icons/ri';

export default function Navigation() {
  return (
    <nav className='bg-slight-gray fixed top-1/2 left-2 flex w-fit -translate-y-1/2 flex-col gap-4 rounded-md px-3 py-4'>
      <Link to='/'>
        <IoHome />
      </Link>
      <Link to='/processes'>
        <RiQuestionAnswerFill />
      </Link>
    </nav>
  );
}
