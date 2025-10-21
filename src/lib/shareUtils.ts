import { ResumeData } from '@/types/resume';

export async function shareResume(resumeData: ResumeData): Promise<void> {
  const shareData = {
    title: `${resumeData.personalInfo.fullName} - Resume`,
    text: `Check out ${resumeData.personalInfo.fullName}'s professional resume`,
    url: window.location.href,
  };

  try {
    if (navigator.share && navigator.canShare(shareData)) {
      await navigator.share(shareData);
      console.log('Shared successfully');
    } else {
      // Fallback: Copy to clipboard
      await copyToClipboard(window.location.href);
      alert('Link copied to clipboard!');
    }
  } catch (error) {
    if ((error as Error).name !== 'AbortError') {
      console.error('Share error:', error);
      // Fallback to clipboard
      await copyToClipboard(window.location.href);
      alert('Link copied to clipboard!');
    }
  }
}

async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}
