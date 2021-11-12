interface Props {
  className: string,
}

export function SearchIcon(props: Props) {
  return (
    <svg className={props.className} viewBox="0 0 15 15">
      <path fill="none" d="M6,11 C8.76142375,11 11,8.76142375 11,6 C11,3.23857625 8.76142375,1 6,1 C3.23857625,1 1,3.23857625 1,6 C1,8.76142375 3.23857625,11 6,11 Z M9.5,9.5 L14.5,14.5"/>
    </svg>
  );
}

export function CancelIcon(props: Props) {
  return (
    <svg className={props.className} viewBox="0 0 15 15">
      <path fill="none" d="M0.269234476,12.5 L11.8489805,0.920253943 M11.8489805,12.5 L0.269234476,0.920253943"/>
    </svg>
  );
}
