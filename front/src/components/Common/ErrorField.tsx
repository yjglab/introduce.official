interface Props {
  error: string | null;
}

export const ErrorField: React.FC<Props> = ({ error }) => {
  return <span className='text-red-600 font-medium'>{error}</span>;
};
