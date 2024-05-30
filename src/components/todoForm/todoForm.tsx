import { TodoItem } from "@/types/TodoItem";
import { MaxLengthInput } from '@/components/function/maxLenght';
import { useState } from "react";
import { Translation } from "@/Locales/translation";
import { Pagination, calculateTotalPages, getPageItems } from "../pagination/pagination";

import ptLanguage from "@/Locales/language_pt.json";
import enLanguage from "@/Locales/language_en.json";

export const TodoForm = () => {
    const [itemInput, setItemInput] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [currentItem, setCurrentItem] = useState('');
    const [message, setMessage] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5); //Define o número de itens por página

    const [list, setList] = useState<TodoItem[]>([
        {label: 'Exemplo de item(Pode excluir)', checked: true, editing: true},
    ]);

    //Contagem total de status
    const countCompletedItens = () => {
        return list.filter(item => item.checked).length;
    }

    //Funções da paginação
    const totalPages = calculateTotalPages(list.length, itemsPerPage);
    const currentPageItems = getPageItems(list, currentPage, itemsPerPage);

    const handleAddButton = () => {
        if(itemInput.trim() === '')return;

        setList([...list, {label: itemInput, checked: false, editing:false}]);
        setItemInput('');
    };

    //Função para lidar com a mudança de página
    const handlePageChange = (page:number) => {
        setCurrentPage(page);
        const newCurrentPageItems = getPageItems(list, page, itemsPerPage);
        // setCurrentPageItems(newCurrentPageItems);
        console.log('Página atualizada');
    }

    //Buttom Edit
    const handleEditClick = (index: number) => {
        setEditingIndex(index);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const itemIndex = startIndex + index;

        //Marca o item como editado na lista
        const updatedList = list.map((item, i) => {
            if(i === itemIndex){
                return { ...item, editing: true };
            }
            return item;
        });
        console.log('Edit pressionado para o índice e o editBox é:' + index);
        //Atualizar a lista com o item editado.
        setList(updatedList);
    }

    const handleSaveClick = (index: number) => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const itemIndex = startIndex + index;
        
        

        //Verificação se a caixa de edição está vazia
        if(currentItem.trim() === ''){

            setMessage('O campo não pode ficar vazio!');

            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }

        // Atualizar o item na lista completa
        const updatedList = list.map((item, i) => {
            if(i === itemIndex){
                return {...item, label: currentItem, editing: false};
            }
            return item;
        })

        setList(updatedList);
        setCurrentItem('');
        setEditingIndex(null);

        setMessage('Item salvo com sucesso!')

        setTimeout(() => {
            setMessage('');
        }, 3000);
    }
    const handleCancelClick = (index:number) => {
        const updatedList = list.map((item, i) => {
            if(i === index){
                return {...item, editing: false};
            }
            return item;
        })
        setList(updatedList);
        setCurrentItem('');
        setEditingIndex(null);
        setMessage('Edição cancelada!');

        setTimeout(() => {
            setMessage('');
        }, 3000);
    }

    const deleteItem = (pageIndex: number, relativeIndex: number) => {
        const startIndex = (pageIndex - 1) * itemsPerPage;
        const originalIndex = startIndex + relativeIndex;
        const updatedList = list.filter((_, i) => i !== originalIndex);
        setList(updatedList);

        setMessage('Item Excluído!');

        setTimeout(() => {
            setMessage('');
        }, 3000);
    }

    const toggeItem = (pageIndex:number, relativeIndex: number) => {
        const startIndex = (pageIndex - 1) * itemsPerPage;
        const originalIndex = startIndex + relativeIndex;
        setList(prevList => prevList.map((item, i) => {
            if (i === originalIndex) {
                return { ...item, checked: !item.checked };
            }
            return item;
        }));
      };

    

    return(
        <>
            {/* Usando o componente de tradução */}
            <div className="">
                <Translation translation={{ pt: ptLanguage, en: enLanguage }}>
                    {({ translation }) => (
                        <div className=" flex justify-around items-center text-base">
                            <div className=" w-screen text-2xl sm:mb-5 ">
                                <h1 className="">{translation.title}</h1>
                            </div>
                            <ul className="mt-72 flex justify-center absolute sm:mt-80 ">
                                <li className="sm:px-14 md:px-16 lg:px-24">{translation.statusComponent.checked}</li>
                                <li className="sm:px-14 md:px-16 lg:px-24">{translation.statusComponent.item}</li>
                                <li className="sm:px-14 md:px-16 lg:px-24">{translation.statusComponent.status}</li>
                                <li className="sm:px-14 md:px-16 lg:px-24">{translation.statusComponent.Del}</li>
                            </ul>
                        </div>
                    )}
                </Translation>
            </div>
        
            <div className="px-3  w-full flex justify-end gap-2 sm:px-8">
                <div className="px-1 py-1 bg-amber-300 text-lg rounded-md shadow-black shadow-inner w-60 text-center">
                    {list.length < 2 ? `${list.length} tarefa` : `${list.length} tarefas`} ao todo na lista
                </div>
                <div className="px-1 py-1 bg-green-500 text-lg rounded-md shadow-black shadow-inner w-44 text-center">
                    {list.length > 1 ? `${countCompletedItens()} tarefas` : `${countCompletedItens()} tarefa`} feitas
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="p-3 rounded-md w-11/12">
                    <input
                        type="text" 
                        placeholder="What do you want to do?"
                        className="bg-gray-500 rounded p-2 w-4/5 text-white text-clip shadow-black shadow-md"
                        style={{ textOverflow: 'ellipsis' }}
                        value={itemInput}
                        onChange={e => setItemInput(e.target.value)}
                        />
                    <button onClick={handleAddButton} className="bg-blue-500 p-2 rounded ml-3 text-white shadow-black shadow-inner hover:shadow-md">To add</button>
                </div>
            </div>

            <div className="w-full h-full px-4 py-5 flex justify-col mb-3 flex-col">
                <div className="-mt-5 rounded-t-md h-16 border-2 border-b-gray-200 bg-white text-lg shadow-black shadow-inner">
                    <ul className="flex justify-around flex-4 w-full h-full items-center">
                        {/* li content */}
                    </ul>
                </div>
                <div className="border-2 border-white border-t-0 rounded-b-md h-full bg-white shadow-black shadow-2xl">
                    <ul className="flex justify-between flex-col w-full p-3 pl-5 mt-4 list-none rounded-md sm:pl-3 sm:pr-3 md:pl-8 md:pr-5">
                        {currentPageItems.map((item, index) =>(
                            <li key={index}
                            className={`pl-5 pr-5 flex justify-between items-center my-1 mx-15 ${editingIndex === index ? 'bg-yellow-200' : ''}`}
                            >
                                <input onClick={() =>toggeItem(currentPage, index)}
                                    type="checkbox"
                                    checked={item.checked}
                                    className="mr-2 w-5 h-5"
                                />

                                {item.label} <p>{`${item.checked === true ? 'Feito' : 'Não feito'}`}</p>

                                <div className="flex items-center space-x-2">
                                    <button onClick={() => handleEditClick(index)}
                                    className="hover:no-underline p-2 rounded-md text-white bg-[#F17809] shadow-black shadow-inner hover:shadow-md hover:bg-[#F17809]-400">Editar</button>

                                    {/* Campo de entrada de texto para editar o conteúdo do item */}
                                    {editingIndex === index && (
                                    <>
                                        <div className="flex absolute -mt-44">
                                            <div className="absolute insert-0 w-11/12 flex justify-end items-center">
                                                <div className="h-1/2 bg-gray-200 p-3 rounded-lg shadow-gray-500 shadow-md">
                                                    <MaxLengthInput maxLength={35} setText={setCurrentItem}/>
                                                    <div className="flex justify-around mt-3">
                                                        <button className="bg-green-500 text-white p-2 rounded-md shadow-black shadow-md hover:shadow-inner" onClick={() => handleSaveClick(index)}>Salvar</button>
                                                        <button className="bg-red-500 text-white p-1 rounded-md shadow-black shadow-md hover:shadow-inner" onClick={() => handleCancelClick(index)}>Cancelar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                    )}

                                    <button onClick={() => deleteItem(currentPage, index)}
                                    className="hover:no-underline p-2 rounded-md text-white bg-red-600 shadow-black shadow-inner hover:shadow-md hover:bg-red-700">Deletar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    {/* Renderizar a lista de tarefas aqui */}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={calculateTotalPages(list.length, itemsPerPage)}
                        onPageChange={setCurrentPage}/>
                </div>
            </div>
            <div className="absolute top-0 left-0 mt-3 ml-5">
                {message.startsWith('Item Deletado!') ? (
                    <div className="border p-2 rounded-md bg-red-600 text-white">{message}</div>
                ) : message.startsWith('O campo não pode ficar vazio!') ? (
                    <div className="p-2 rounded-md bg-red-600 text-white">{message}</div>
                ) : message && (
                    <div className="animate-bounce bg-amber-400 p-2 rounded-md text-white">{message}</div>
                )}
            </div>
        </>
    )
}