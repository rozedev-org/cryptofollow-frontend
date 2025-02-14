import {
  PaginatedResponse,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import { newUser, UserEntity } from "../types/users.types";
import { useState } from "react";
import { useHandleData } from "@/app/states/useHandleData";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useUsers = () => {
  const fetchUsers = async (params: PaginationParams) => {
    try {
      const { bff } = config;
      setIsLoading(true);
      const {} = params;
      const response = await fetch(`${bff.url}/users`, {
        credentials: "include",
      }).then((res) => res.json() as Promise<PaginatedResponse<UserEntity>>);

      setUsers(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const [users, setUsers] = useState<PaginatedResponse<UserEntity>>({
    data: [] as UserEntity[],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: true,
    },
  });

  const [isLoading, setIsLoading] = useState(true);

  return {
    users,
    fetchUsers,
    isLoading,
  };
};

export const useUser = (id: number) => {
  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const { bff } = config;

      const response = await fetch(`${bff.url}/users/${id}`, {
        credentials: "include",
      }).then((res) => res.json());
      setUser(response);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserEntity>({
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    loginTries: 0,
    isEnabled: false,
    picture: "",
    role: "",
  });

  return { fetchUser, user, setUser, isLoading };
};

export const useCreateUser = () => {
  const { setIsCreating, handleRefreshSignal } = useHandleData();

  const userForm = useForm<newUser>({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = userForm.handleSubmit(async (values) => {
    setIsCreating(true);
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      toast.success(`Se ha creado un Usuario`);
      console.log(response);
      handleRefreshSignal(true);
      setIsCreating(false);
    } catch (error) {
      toast.error("Ha ocurrido un error al crear el Usuario");
      console.log(error);
      setIsCreating(false);
    }
  });

  return { userForm, onSubmit };
};
