import {create} from "zustand";

interface ActiveListStore {
    members : string[];
    add : (member : string) => void;
    remove : (member : string) => void;
    set : (member : string[]) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
    members : [],
    add : (id) => set((state) => ({members : [...state.members, id]})),
    remove : (id) => set((state) => ({members : state.members.filter((memId) => memId !== id)})),
    set : (ids) => set({members: ids})
}));

export default useActiveList;