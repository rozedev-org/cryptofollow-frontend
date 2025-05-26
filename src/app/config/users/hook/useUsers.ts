import {
  PaginationMeta,
  PaginationParams,
} from "@/common/interfaces/response.interface";
import { config } from "@/config";
import { newUser, UserEntity } from "../types/users.types";
import { useState } from "react";
import { useHandleData } from "@/app/states/useHandleData";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { UsersApiHandler } from "@/app/api/config/users/users.api";

export function useUsers() {
  const usersApiHandler = new UsersApiHandler();
  const fetchUsers = async (params: PaginationParams) => {
    const response = await usersApiHandler.find(params);
    if (usersApiHandler.onError || !response) {
      cleanState();
    } else {
      const { data, meta } = response;
      handleSetNewData(data, meta);
    }
  };
  const [users, setUsers] = useState({
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
  const handleSetNewData = (newData: UserEntity[], newMeta: PaginationMeta) => {
    setUsers(() => ({
      data: newData,
      meta: newMeta,
    }));
  };
  const cleanState = () => {
    setUsers({
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
  };
  return {
    data: users.data,
    meta: users.meta,
    handleSetNewData,
    setUsers,
    cleanState,
    fetchUsers,
  };
}

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

export const useCreateUser = (setOpen: (open: boolean) => void) => {
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
      setOpen(false);
    } catch (error) {
      toast.error("Ha ocurrido un error al crear el Usuario");
      console.log(error);
      setIsCreating(false);
      setOpen(false);
    }
  });

  return { userForm, onSubmit };
};
export const useUpdateUser = (
  data: UserEntity,
  setOpen: (open: boolean) => void
) => {
  const { setIsCreating, handleRefreshSignal } = useHandleData();

  const userUpdateForm = useForm<newUser>({
    defaultValues: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      // role: data.role,
    },
  });

  const onSubmit = userUpdateForm.handleSubmit(async (values) => {
    setIsCreating(true);
    try {
      const { bff } = config;
      const response = await fetch(`${bff.url}/users/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });
      toast.success(`Se ha actualizado un Usuario`);
      console.log(response);
      handleRefreshSignal(true);
      setIsCreating(false);
      setOpen(false);
    } catch (error) {
      toast.error("Ha ocurrido un error al actualizar el Usuario");
      console.log(error);
      setIsCreating(false);
      setOpen(false);
    }
  });

  return { userUpdateForm, onSubmit };
};
