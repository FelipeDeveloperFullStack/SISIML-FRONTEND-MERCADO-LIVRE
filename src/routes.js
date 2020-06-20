import AnuncioController from "modules/views/Anuncio/AnuncioController";
import DashboardController from "modules/views/Dashboard/DashboardController";
import ClienteController from "modules/views/Cliente/ClienteController";
import ControleEstoqueController from 'modules/views/Controle-estoque/ControlleEstoqueController'
import VendasController from 'modules/views/Vendas/VendasController'
import MensagensAutomaticasController from 'modules/views/MensagensAutomaticas/MensagensAutomaticasController'
import BloqueioController from '../src/modules/views/Bloqueio/BloqueioController'
import ChatController from '../src/modules/views/Chat/ChatController'

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "chart pie icon",
    component: DashboardController,
    layout: "/admin"
  },
  {
    path: "/anuncios",
    name: "Anúncios",
    icon: "fa fa-pencil-square-o",
    component: AnuncioController,
    layout: "/admin"
  },
  {
    path: '/clientes',
    name: 'Clientes',
    icon: 'fa fa-users',
    component: ClienteController,
    layout: '/admin'
  },
  {
    path: "/controle_estoque",
    name: "Controle de estoque",
    icon: "fa fa-book",
    component: ControleEstoqueController,
    layout: "/admin"
  },
  {
    path: "/vendas",
    name: "Vendas",
    icon: "fa fa-shopping-cart",
    component: VendasController,
    layout: "/admin"
  },
  {
    path: "/mensagens_automaticas",
    name: "Mensagens automáticas",
    icon: "fa fa-paper-plane",
    component: MensagensAutomaticasController,
    layout: "/admin"
  },
  {
    path: "/bloqueios",
    name: "Bloqueios",
    icon: "fa fa-ban",
    component: BloqueioController,
    layout: "/admin"
  },
  {
    path: "/chat",
    name: "Chat",
    icon: "fa fa-comments",
    component: ChatController,
    layout: "/admin"
  }
];

export default dashboardRoutes;