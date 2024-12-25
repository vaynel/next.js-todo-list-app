export const isAuthenticated = (): boolean => {
  const user = sessionStorage.getItem('user'); // sessionStorage에서 사용자 정보 가져오기
  return !!user; // 사용자 정보가 있으면 true, 없으면 false 반환
};
