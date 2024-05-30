import { TodoItem } from '@/types/TodoItem';
import { useState } from 'react';

export const editItem = (index: number, setEditing: React.Dispatch<boolean>) => {
  console.log(`Editando item com índice ${index}`);
  setEditing(true); // Define o estado de edição como true
};