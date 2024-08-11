'use client'
import {useSearchTextContext} from "@/hooks/use-search-context";


export const SearchForm = () => {
  const { searchText, searchHandler} = useSearchTextContext()

    return (
        <form className={'w-full h-full'}>
            <input className={'w-full h-full bg-white/20 rounded-md px-5 outline-none transition focus:bg-white/50 hover:bg-white/30 placeholder:text-white/50  '}
                   placeholder={'Search for a suitcase'}
                   type={'search'}
                   onChange={searchHandler}
                   value={searchText}

            />
        </form>
    );
};

