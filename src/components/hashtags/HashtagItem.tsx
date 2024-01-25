type THashtagItemProps = {
  hash: string;
  onSelectHash: (hash: string) => void;
};

function HashtagItem({ hash, onSelectHash }: THashtagItemProps) {
  return (
    <li>
      <button onClick={() => onSelectHash(hash)}>{`#${hash}`}</button>
    </li>
  );
}
export default HashtagItem;
