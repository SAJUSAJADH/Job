import { currentUser } from '@clerk/nextjs'

const stats = [
  { id: 1, name: 'Job searches every 24 hours', value: '44 million' },
  { id: 2, name: 'New Jobs', value: '11900+' },
  { id: 3, name: 'New users annually', value: '46,000' },
]
const posts = [
  {
    id: 1,
    title: 'Boost your conversion rate',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Development', href: '#' },
    author: {
      name: 'Michael Foster',
      role: 'Co-Founder / CTO',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'Refactor your cv',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Hiring', href: '#' },
    author: {
      name: 'Camila feccuchi',
      role: 'HR Manager',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 1,
    title: 'How to find Oppurtunities',
    href: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Marketing', href: '#' },
    author: {
      name: 'Jean wande',
      role: 'Marketing lead',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  // More posts...
]
const people = [
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'HR Manager',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3 Months ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Michael Foster',
    email: 'michael.foster@example.com',
    role: 'Senior Executive',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3 Months ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Dries Vincent',
    email: 'dries.vincent@example.com',
    role: 'Business Relations',
    imageUrl:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '1 Month ago',
  },
  {
    name: 'Lindsay Walton',
    email: 'lindsay.walton@example.com',
    role: 'Front-end Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3 Months ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Courtney Henry',
    email: 'courtney.henry@example.com',
    role: 'Designer',
    imageUrl:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3 Months ago',
    lastSeenDateTime: '2023-01-23T13:23Z',
  },
  {
    name: 'Tom Cook',
    email: 'tom.cook@example.com',
    role: 'Director of Product',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    lastSeen: '3 Months',
  },
]
export default async function About() {
  const user = await currentUser()

  return (
    <>
      <div className='bg-white py-24 sm:py-36'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <dl className='grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3'>
            {stats.map((stat) => (
              <div
                key={stat.id}
                className='mx-auto flex max-w-xs flex-col gap-y-4'
              >
                <dt className='text-base leading-7 text-gray-600'>
                  {stat.name}
                </dt>
                <dd className='order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <h2 className='text-center text-lg font-semibold leading-8 text-gray-900'>
            Trusted by the world’s most innovative teams
          </h2>
          <div className='mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5'>
            <img
              alt='Transistor'
              src='https://tailwindui.com/img/logos/158x48/transistor-logo-gray-900.svg'
              width={158}
              height={48}
              className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
            />
            <img
              alt='Reform'
              src='https://tailwindui.com/img/logos/158x48/reform-logo-gray-900.svg'
              width={158}
              height={48}
              className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
            />
            <img
              alt='Tuple'
              src='https://tailwindui.com/img/logos/158x48/tuple-logo-gray-900.svg'
              width={158}
              height={48}
              className='col-span-2 max-h-12 w-full object-contain lg:col-span-1'
            />
            <img
              alt='SavvyCal'
              src='https://tailwindui.com/img/logos/158x48/savvycal-logo-gray-900.svg'
              width={158}
              height={48}
              className='col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1'
            />
            <img
              alt='Statamic'
              src='https://tailwindui.com/img/logos/158x48/statamic-logo-gray-900.svg'
              width={158}
              height={48}
              className='col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1'
            />
          </div>
        </div>
      </div>
      <div className='px-3 lg:px-16 xl:px-32 py-1 lg:py-5'>
        <h2 className='text-xl lg:text-2xl py-3 font-norrmal'>
          Recent Placements
        </h2>
        <ul role='list' className='divide-y divide-gray-100'>
          {people.map((person) => (
            <li
              key={person.email}
              className='flex justify-between gap-x-6 py-5'
            >
              <div className='flex min-w-0 gap-x-4'>
                <img
                  alt=''
                  src={person.imageUrl}
                  className='h-12 w-12 flex-none rounded-full bg-gray-50'
                />
                <div className='min-w-0 flex-auto'>
                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                    {person.name}
                  </p>
                  <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                    {person.email}
                  </p>
                </div>
              </div>
              <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                <p className='text-sm leading-6 text-gray-900'>{person.role}</p>
                {person.lastSeen ? (
                  <p className='mt-1 text-xs leading-5 text-gray-500'>
                    <time dateTime={person.lastSeenDateTime}>
                      {person.lastSeen}
                    </time>
                  </p>
                ) : (
                  <div className='mt-1 flex items-center gap-x-1.5'>
                    <div className='flex-none rounded-full bg-emerald-500/20 p-1'>
                      <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
                    </div>
                    <p className='text-xs leading-5 text-gray-500'>Online</p>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex -space-x-2 overflow-hidden justify-center items-center py-10'>
        <img
          alt=''
          src='https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          className='inline-block h-10 w-10 rounded-full ring-2 ring-white'
        />
        <img
          alt=''
          src='https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          className='inline-block h-10 w-10 rounded-full ring-2 ring-white'
        />
        <img
          alt=''
          src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80'
          className='inline-block h-10 w-10 rounded-full ring-2 ring-white'
        />
        <img
          alt=''
          src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
          className='inline-block h-10 w-10 rounded-full ring-2 ring-white'
        />
      </div>
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              From our blog
            </h2>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              Learn how to land your first job with our expert advice.
            </p>
          </div>
          <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            {posts.map((post) => (
              <article
                key={post.id}
                className='flex max-w-xl flex-col items-start justify-between'
              >
                <div className='flex items-center gap-x-4 text-xs'>
                  <time dateTime={post.datetime} className='text-gray-500'>
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className='group relative'>
                  <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                    <a href={post.href}>
                      <span className='absolute inset-0' />
                      {post.title}
                    </a>
                  </h3>
                  <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                    {post.description}
                  </p>
                </div>
                <div className='relative mt-8 flex items-center gap-x-4'>
                  <img
                    alt=''
                    src={post.author.imageUrl}
                    className='h-10 w-10 rounded-full bg-gray-50'
                  />
                  <div className='text-sm leading-6'>
                    <p className='font-semibold text-gray-900'>
                      <a href={post.author.href}>
                        <span className='absolute inset-0' />
                        {post.author.name}
                      </a>
                    </p>
                    <p className='text-gray-600'>{post.author.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <section>
        <div className='max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-16 lg:py-16'>
          <div className='grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16'>
            <div className='mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right'>
              <h2 className='text-3xl font-bold sm:text-4xl'>
                Find your career path
              </h2>

              <p className='mt-4 text-gray-600 text-justify'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                vero aliquid sint distinctio iure ipsum cupiditate? Quis, odit
                assumenda? Deleniti quasi inventore, libero reiciendis minima
                aliquid tempora. Obcaecati, autem.
              </p>

              <a
                href='/signup'
                className={`${user && 'hidden'} mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400`}
              >
                Get Started Today
              </a>
            </div>

            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='/search/accountant'
              >
                <span className='inline-block rounded-lg bg-gray-50 p-3'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z'></path>
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    ></path>
                  </svg>
                </span>

                <h2 className='mt-2 font-bold'>Accountant</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Accountatnt positions opened
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='/search/development'
              >
                <span className='inline-block rounded-lg bg-gray-50 p-3'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z'></path>
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    ></path>
                  </svg>
                </span>

                <h2 className='mt-2 font-bold'>Development</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Developer positions opened
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='/search/hiring manager'
              >
                <span className='inline-block rounded-lg bg-gray-50 p-3'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z'></path>
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    ></path>
                  </svg>
                </span>

                <h2 className='mt-2 font-bold'>Hiring Manager</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  HR positions opened
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='/search/ml engineers'
              >
                <span className='inline-block rounded-lg bg-gray-50 p-3'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z'></path>
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    ></path>
                  </svg>
                </span>

                <h2 className='mt-2 font-bold'>ML Engineers</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Machine Learning positions opened
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='/search/banking'
              >
                <span className='inline-block rounded-lg bg-gray-50 p-3'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z'></path>
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    ></path>
                  </svg>
                </span>

                <h2 className='mt-2 font-bold'>Banking</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  Banking positions opened.
                </p>
              </a>

              <a
                className='block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring'
                href='/search/cybersecurity'
              >
                <span className='inline-block rounded-lg bg-gray-50 p-3'>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M12 14l9-5-9-5-9 5 9 5z'></path>
                    <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'></path>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
                    ></path>
                  </svg>
                </span>

                <h2 className='mt-2 font-bold'>Cybersecurity</h2>

                <p className='hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600'>
                  cybersecurity positions opened
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
