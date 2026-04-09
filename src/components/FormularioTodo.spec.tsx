import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom/vitest";

import { FormularioTodo } from "./FormularioTodo";

describe("Componente: FormularioTodo", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("deve renderizar o campo de título e o botão de salvar na tela", () => {
    render(<FormularioTodo />);

    const inputTitulo = screen.getByRole("textbox", { name: /nova tarefa/i });

    const botaoSalvar = screen.getByRole("button", {
      name: /adicionar tarefa/i,
    });

    expect(inputTitulo).toBeInTheDocument();
    expect(botaoSalvar).toBeInTheDocument();
  });

  it("deve salvar a tarefa no localStorage ao preencher e clicar em salvar", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const user = userEvent.setup();
    render(<FormularioTodo />);

    const inputTitulo = screen.getByRole("textbox", { name: /nova tarefa/i });
    const botaoSalvar = screen.getByRole("button", {
      name: /adicionar tarefa/i,
    });

    await user.type(inputTitulo, "Estudar testes");
    await user.click(botaoSalvar);

    expect(setItemSpy).toHaveBeenCalledWith(
      "lista-tarefas",
      JSON.stringify(["Estudar testes"]),
    );
  });

  it("não deve salvar a tarefa e deve exibir um erro se o título estiver vazio", async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, "setItem");

    const user = userEvent.setup();
    render(<FormularioTodo />);

    const botaoSalvar = screen.getByRole("button", {
      name: /adicionar tarefa/i,
    });

    await user.click(botaoSalvar);

    expect(setItemSpy).not.toHaveBeenCalled();

    const mensagemErro = await screen.findByText(/o título é obrigatório/i);
    expect(mensagemErro).toBeInTheDocument();
  });

  it("deve listar as tarefas salvas na tela", async () => {
    const user = userEvent.setup();
    render(<FormularioTodo />);

    const input = screen.getByRole("textbox", { name: /nova tarefa/i });
    const botao = screen.getByRole("button", { name: /adicionar tarefa/i });

    await user.type(input, "Primeira Tarefa");
    await user.click(botao);

    await user.clear(input);

    await user.type(input, "Segunda Tarefa");
    await user.click(botao);

    expect(screen.getByText("Primeira Tarefa")).toBeInTheDocument();
    expect(screen.getByText("Segunda Tarefa")).toBeInTheDocument();
  });
});
