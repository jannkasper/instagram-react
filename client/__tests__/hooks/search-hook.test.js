import { renderHook, act } from '@testing-library/react-hooks';
import searchInstagramHook from '../../hooks/search-hook';
import { publicFetch } from "../../util/fetcher";
import Router from 'next/router'


jest.mock("../../util/fetcher");
jest.mock('next/router', ()=> ({push: jest.fn()}))


describe("search-hook triggered", () => {
    test('success search result', async () => {
        const expected = { results: [{id: 1}, {id: 2}, {id: 3}] };
        publicFetch.get.mockImplementationOnce(() => Promise.resolve( { status: 200, data: expected }));

        const { result } = renderHook(() => searchInstagramHook());


        await act(async () => {
            result.current.setSearchValue('test');
        })

        expect(result.current.searchValue).toBe('test');
        expect(result.current.searchResult).toBe(expected);
    })

    test('bad search result', async () => {
        const expected = { error: 'error' };
        publicFetch.get.mockImplementationOnce(() => Promise.resolve( { status: 200, data: expected }));

        const { result } = renderHook(() => searchInstagramHook());


        await act(async () => {
            result.current.setSearchValue('test');
        })

        expect(result.current.searchValue).toBe('test');
        expect(Router.push).toHaveBeenCalledWith('/404')
    })
});
