import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name)
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto

    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, criarJogadorDto)
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultarJogadorPeloEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Não foi encontrado nenhum jogador com o email ${email}`)
    }

    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)

    if (!jogadorEncontrado) {
      throw new NotFoundException(`Não foi encontrado nenhum jogador com o email ${email}`)
    }

    this.jogadores = this.jogadores.filter(jogador => jogador.email !== email)
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criarJogadorDto

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFoto: ""
    }

    this.logger.log(`criar: ${JSON.stringify(jogador)}`)
    this.jogadores.push(jogador)
  }

  private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
  }

}
