import { useQuery } from "@tanstack/react-query";
import { useApi } from "../lib/axios";
import type { Chat } from "../type";

export const useChats = () => {
  const api = useApi();
  return useQuery({
    queryKey: ["chats"],

    queryFn: async () => {
      const { data } = await api.get<Chat[]>("/chat");
      return data;
    },
  });
};
