import { useRef } from 'react';
import { toPng } from 'html-to-image';

export const Test = () => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (divRef.current === null) return;

    toPng(divRef.current)
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'compare.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Compare LeetCode and GitHub</h1>
      <div ref={divRef} className="bg-charcoalGray p-4 text-softWhite">
        <p>leetcode</p>
        <p>github</p>
      </div>
      <button onClick={handleDownload}>Download as PNG</button>
    </div>
  );
};
