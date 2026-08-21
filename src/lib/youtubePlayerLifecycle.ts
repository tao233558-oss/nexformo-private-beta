export const YOUTUBE_API_READY_TIMEOUT_MS = 18_000;
export const YOUTUBE_AUTOPLAY_CONFIRM_MS = 3_800;
export const YOUTUBE_MANUAL_PLAY_CONFIRM_MS = 6_500;

export function resolveYouTubePlaybackFallback(input: {
  currentIndex: number;
  trackCount: number;
  fallbackAttempted: boolean;
}) {
  if (input.fallbackAttempted) return null;
  const nextIndex = Math.floor(input.currentIndex) + 1;
  if (nextIndex < 0 || nextIndex >= Math.floor(input.trackCount)) return null;
  return nextIndex;
}

export function youtubePlayerErrorMessage(code: number) {
  if (code === 2) return "歌曲地址无效。";
  if (code === 5) return "当前浏览器无法播放这个视频。";
  if (code === 100) return "这个视频已被删除或设为私密。";
  if (code === 101 || code === 150) return "这首歌曲不允许在网站内嵌播放。";
  return "歌曲暂时无法播放。";
}

