## 사용자 메뉴 포맷

- Header Menu Item
  ```json
  {
    header: 'Main navigation',      // (필수) 헤더 텍스트
    hidden: false,                  // (옵션) 숨길지 여부
    hiddenOnCollapsed: true,        // (옵션) 접혔을 때 숨김 여부
    class: '',                      // (옵션) 스타일 클래스 명
    attributes: {},                 // (옵션) 태그에 설정할 속성들
  }
  ```
- Component Menu Item
  ```json
  {
    component: componentName,         // (필수) 컴포넌트 이름 또는 컴포넌트. ex Separator 컴포넌트
    props: componentProps,            // (옵션) 컴포넌트에 전달할 속성들
    hidden: false,                    // (옵션) 숨길지 여부
    hiddenOnCollapse: true,           // (옵션) 접혔을 때 숨김 여부
  }
  ```
- Menu Item
  ```json
  {
    href: '/',                        // (필수) 이동할 route url, href: { path: '/' } 과 깉이 객체도 가능, 단 Child를 가지는 단순한 경우는 생략
    title: 'Dashboard',               // (필수) 표시명
    icon: 'fa fa-user',               // (옵션) 아이콘, icon: { element: 'span', class: 'fa fa-user', attributes: {}, text: '' } 로 객체도 가능
    badge: null,                      // (옵션) 메뉴 배지, badge: { text: 'new', class: 'vsm--badge_default', attributes: {}, element: 'span' } 로 객체로 사용
    child: [],                        // (옵션) 서브 메뉴항목
    disabled: true,										// (옵션) 비활성화 여부
    class: '',												// (옵션) 스타일 클래스 명
    attributes: {},										// (옵션) 태그에 설정할 속성들
    hidden: false,										// (옵션) 숨길지 여부
    hiddenOnCollapse: true,						// (옵션) 접혔을 때 숨김 여부
    external: true,										// (옵션) Hyperlink 처리 여부
    exact: true												// (옵션) 현재 라우트가 동일한 경우 'Active' 클래스 설정 여부 (Route records 기준으로 query & hash 등은 상관없음)
  }
  ```