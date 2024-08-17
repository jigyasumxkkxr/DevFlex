import React, { useRef } from 'react';
import GitHubProfile from './profilepic';
import { toPng } from 'html-to-image';

interface BarChartProps {
  githubCommits: number;
  leetcodeQuestions: number;
  username: string | null;
  leetcodeUsername: string | null
}

const BarChart: React.FC<BarChartProps> = ({username,leetcodeUsername, githubCommits, leetcodeQuestions }) => {
  const divRef = useRef<HTMLDivElement>(null)

  const maxValue = Math.max(githubCommits, leetcodeQuestions);
  const githubHeight = maxValue > 0 ? (githubCommits / maxValue) * 100 : 0;
  const leetcodeHeight = maxValue > 0 ? (leetcodeQuestions / maxValue) * 100 : 0;

  const calculatePercentageDifference = (value1: number, value2: number) => {
    if (value1 === 0 && value2 === 0) return 0;
    if (value1 === 0) return value2 > 0 ? Infinity : -Infinity;
    if (value2 === 0) return -100;
    return ((value2 - value1) / value1) * 100;
  };

  const percentageDifference = githubCommits > leetcodeQuestions
    ? calculatePercentageDifference(leetcodeQuestions, githubCommits)
    : calculatePercentageDifference(githubCommits, leetcodeQuestions);

  let differenceLabel = '';
  if (githubCommits > 0 && leetcodeQuestions > 0) {
    if (githubCommits > leetcodeQuestions) {
      differenceLabel = `You spends ${percentageDifference.toFixed(0)}% more time commiting code than commiting algorithm solutions to memory`;
    } else if (leetcodeQuestions > githubCommits) {
      differenceLabel = `You solves ${percentageDifference.toFixed(0)}% more two-pointer problems than they point out in code reviews`;
    }
  }else if (githubCommits === 0 && leetcodeQuestions === 0) {
    differenceLabel = 'Both values are zero';
  } else if (githubCommits === 0) {
    differenceLabel = leetcodeQuestions > 0 ? 'No commits but solved LeetCode questions' : 'Both values are zero';
  } else if (leetcodeQuestions === 0) {
    differenceLabel = githubCommits > 0 ? 'No solved LeetCode questions but commits' : 'Both values are zero';
  }

  const downloadHandler = () => {
    if (divRef.current === null) {
      return;
    }

    toPng(divRef.current)
      .then((dataUrl) => {

        const link = document.createElement('a');
        link.download = 'my-image.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  }

  const shareHandler = () => {
    const currentUrl = window.location.href
    const twitterUrl = `https://twitter.com/intent/tweet?text=${currentUrl}`;

    window.open(twitterUrl, '_blank');
  }
  return (
    <div className='bg-neutral-950 text-gray-300 font-thin border rounded border-gray-600 w-full h-full flex flex-col'>
      <div ref={divRef} className='flex flex-grow justify-between items-end'>
        <div className='w-2/3 flex flex-col my-auto'> 
          <div className='flex-grow p-3 flex items-center gap-2'>
            <GitHubProfile username={username} />
            <div className='flex flex-col gap-2'>
            <div className='flex items-center border border-gray-600 rounded-lg pr-3'>
              <svg className="mx-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              <div className='flex flex-col text-start'>
                <div className='underline'>
                {`${username}`}
                </div>
                <div>
                {`${githubCommits} commits`}
                </div>
              </div>
              </div>
              <div className='flex items-center border border-gray-600 rounded-lg pr-3'>
              <svg className="mx-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill="#B3B1B0" d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"></path><path fill="#E7A41F" d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"></path><path fill="#070706" d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"></path></svg>
              <div className='flex flex-col text-start'>
                <div className='underline'>
                {`${leetcodeUsername}`}
                </div>
                <div>
                {`${leetcodeQuestions} solved`}
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className='h-1/4 px-3'>
          {githubCommits !== leetcodeQuestions && (
              <div className='font-normal'>
                {differenceLabel}
              </div>
            )}
          </div>
        </div>
        <div className='w-1/5 h-4/5 flex justify-center gap-4 pb-1'>
          <div className='w-1/4 flex flex-col justify-end gap-1'>
          <div className='flex justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            </div>
            <div
              className='bg-green-500 w-full rounded'
              style={{ height: githubHeight > 100 ? '100%' : `${githubHeight}%` }}
            >
            </div>
          </div>
          <div className='w-1/4 flex flex-col justify-end gap-1'>
          <div className='flex justify-center'>
          <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path fill="#B3B1B0" d="M22 14.355c0-.742-.564-1.346-1.26-1.346H10.676c-.696 0-1.26.604-1.26 1.346s.563 1.346 1.26 1.346H20.74c.696.001 1.26-.603 1.26-1.346z"></path><path fill="#E7A41F" d="m3.482 18.187 4.313 4.361c.973.979 2.318 1.452 3.803 1.452 1.485 0 2.83-.512 3.805-1.494l2.588-2.637c.51-.514.492-1.365-.039-1.9-.531-.535-1.375-.553-1.884-.039l-2.676 2.607c-.462.467-1.102.662-1.809.662s-1.346-.195-1.81-.662l-4.298-4.363c-.463-.467-.696-1.15-.696-1.863 0-.713.233-1.357.696-1.824l4.285-4.38c.463-.467 1.116-.645 1.822-.645s1.346.195 1.809.662l2.676 2.606c.51.515 1.354.497 1.885-.038.531-.536.549-1.387.039-1.901l-2.588-2.636a4.994 4.994 0 0 0-2.392-1.33l-.034-.007 2.447-2.503c.512-.514.494-1.366-.037-1.901-.531-.535-1.376-.552-1.887-.038l-10.018 10.1C2.509 11.458 2 12.813 2 14.311c0 1.498.509 2.896 1.482 3.876z"></path><path fill="#070706" d="M8.115 22.814a2.109 2.109 0 0 1-.474-.361c-1.327-1.333-2.66-2.66-3.984-3.997-1.989-2.008-2.302-4.937-.786-7.32a6 6 0 0 1 .839-1.004L13.333.489c.625-.626 1.498-.652 2.079-.067.56.563.527 1.455-.078 2.066-.769.776-1.539 1.55-2.309 2.325-.041.122-.14.2-.225.287-.863.876-1.75 1.729-2.601 2.618-.111.116-.262.186-.372.305-1.423 1.423-2.863 2.83-4.266 4.272-1.135 1.167-1.097 2.938.068 4.127 1.308 1.336 2.639 2.65 3.961 3.974.067.067.136.132.204.198.468.303.474 1.25.183 1.671-.321.465-.74.75-1.333.728-.199-.006-.363-.086-.529-.179z"></path></svg>
          </div>
            <div
              className='bg-orange-500 w-full rounded'
              style={{ height: leetcodeHeight > 100 ? '100%' : `${leetcodeHeight}%` }}
            >
            </div>
          </div>
        </div>
        
      </div>
      <div className='h-1/5 border-t border-gray-500 flex items-center justify-between px-6'>
        <button onClick={downloadHandler} className='bg-black border border-gray-400 px-3 h-1/2 rounded'>Download as PNG</button>
        <button onClick={shareHandler} className='bg-gray-100 text-black px-3 font-normal h-1/2 rounded hover:bg-gray-200'>Share</button>
      </div>
    </div>
  );
};

export default BarChart;
