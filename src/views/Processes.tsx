import { PROCESSES } from '../data/PROCESSES';

export default function Processes() {
  return (
    <main>
      <section className='m-auto flex h-screen w-xl flex-col items-center justify-center gap-4'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold'>How Vision Guard Works?</h1>
          <p className='opacity-80'>
            Vision Guard runs in the background and sends timely notifications,
            helping you maintain productivity while taking care of your vision.
          </p>
        </div>
        <div className='space-y-2'>
          {PROCESSES.map((process, index) => (
            <div className='flex gap-4'>
              <span className='bg-green flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-semibold text-white'>
                {index + 1}
              </span>
              <div>
                <h2 className='font-semibold'>{process.title}</h2>
                <p className='opacity-80'>{process.description}</p>
              </div>
            </div>
          ))}
        </div>
        <p className='opacity-80'>
          This process repeats automatically, ensuring you protect your eyes
          throughout the day without interrupting your workflow
        </p>
      </section>
    </main>
  );
}
