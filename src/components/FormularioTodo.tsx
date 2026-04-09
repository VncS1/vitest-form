import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const todoSchema = z.object({
  titulo: z.string().min(1, "O título é obrigatório"),
});

type TodoFormData = z.infer<typeof todoSchema>;

export function FormularioTodo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const [tarefas, setTarefas] = useState<string[]>(() => {
    const tarefasSalvas = localStorage.getItem("lista-tarefas");
    return tarefasSalvas ? JSON.parse(tarefasSalvas) : [];
  });

  function handleSalvar(data: TodoFormData) {
    const novaLista = [...tarefas, data.titulo];

    setTarefas(novaLista);
    localStorage.setItem("lista-tarefas", JSON.stringify(novaLista));

    reset();
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
        Meu To-Do List
      </h2>

      <form onSubmit={handleSubmit(handleSalvar)} className="space-y-4">
        <div>
          <label
            htmlFor="titulo"
            className="block text-sm font-medium text-slate-700"
          >
            Nova Tarefa
          </label>

          <input
            id="titulo"
            type="text"
            placeholder="Ex: Criar testes automatizados..."
            className={`mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors ${
              errors.titulo
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : "border-slate-300 focus:border-blue-500 focus:ring-blue-200"
            }`}
            {...register("titulo")}
          />

          {errors.titulo && (
            <p className="mt-1 text-sm text-red-600 font-medium">
              {errors.titulo.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Adicionar Tarefa
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-slate-700 mb-3">
          Tarefas Salvas:
        </h3>

        {tarefas.length === 0 ? (
          <p className="text-slate-500 text-sm italic text-center">
            Nenhuma tarefa salva ainda.
          </p>
        ) : (
          <ul className="space-y-2">
            {tarefas.map((tarefa, index) => (
              <li
                key={index}
                className="bg-slate-50 p-3 rounded-md border border-slate-200 text-slate-700 flex items-center"
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                {tarefa}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
