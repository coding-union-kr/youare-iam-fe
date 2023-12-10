import BottomNavigation from '@/components/layout/BottomNavigation';
import TextInput from '@/components/ui/TextInput';
import { useState, ChangeEvent } from 'react';

export default function Page() {
  const [text, setText] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <TextInput value={text} onChange={onChange} />
      <BottomNavigation />
    </div>
  );
}
