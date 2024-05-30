// import { TodoItem } from "@/types/TodoItem";
import React from "react";

export const calculateTotalPages = (totalItems:number, itemsPerPage:number) => {
    return Math.ceil(totalItems / itemsPerPage);
}

export const getPageItems = (allItems: any[], currentPage: number, itemsPerPage:number) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allItems.slice(startIndex, endIndex);
}

type PageChangeHandler = (page: number) => void;

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: PageChangeHandler;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className=" mt-3 flex justify-center">
      <button onClick={handlePrevClick} disabled={currentPage === 1}
      className={`${currentPage <= 1 ? 'py-2 px-4 mr-4 rounded-md bg-gray-400 text-gray-500 shadow-black shadow-inner' : 'py-2 px-4 mr-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 shadow-black shadow-inner hover:shadow-md'}`}
        >Anterior</button>
      <span className="border bg-orange-700 text-white rounded-md w-12 flex justify-center items-center">{currentPage}</span>
      <button onClick={handleNextClick} disabled={currentPage >= totalPages}
    
      className={`py-2 px-4 rounded-md ${currentPage < totalPages ? 'ml-4 bg-orange-500 text-white hover:bg-orange-600 shadow-black shadow-inner hover:shadow-md' : 'ml-4 bg-gray-400 text-gray-500 shadow-black shadow-inner'}`}
    
      >Próxima</button>
    </div>
  );
};