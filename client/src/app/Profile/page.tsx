'use client';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PageTitle from '../../components/title';
import SidebarLayout from '../../components/sidebar';
import { SidebarProvider } from 'components/ui/sidebar';

const ShowProfilePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/Login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Carregando...</p>;
  }
  if (!session) return null;

  const user = session.user;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-white w-screen">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <SidebarLayout />
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 flex flex-col">
          <div className="w-full p-8">
            <PageTitle title="Seu Perfil" showBackButton={true} />
          </div>

          {/* Conteúdo do perfil */}
          <div className="flex-1 p-8">
            <div className="flex flex-col">
              <div className="flex">
                {/* Botão de editar e foto de perfil */}
                <div className="w-1/3">
                  <div className="flex flex-col items-center w-full">
                    <div className="w-[280px]">
                    <button className="px-4 py-2 bg-[#562b00] text-black rounded hover:bg-[#492201] w-full">
  Editar Perfil
</button>
                    </div>
                    <img
                      src={user.image}
                      alt="Foto de perfil"
                      className="w-1/2 h-auto object-cover rounded-md mt-4"
                    />
                  </div>
                </div>

                {/* Detalhes do usuário */}
                <div className="w-2/3 ml-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-lg font-nunito text-[#562b00]">Nome</label>
                      <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                    </div>
                    <div>
                      <label className="block text-lg font-nunito text-[#562b00]">Username</label>
                      <p className="mt-1 text-sm text-gray-900">{user.username}</p>
                    </div>
                    <div>
                      <label className="block text-lg font-nunito text-[#562b00]">Biografia</label>
                      <p className="mt-1 text-sm text-gray-900">{user.bio || "vazia"}</p>
                    </div>
                    <div>
                      <label className="block text-lg font-nunito text-[#562b00]">E-mail</label>
                      <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="flex mt-8">
                    <div className="w-1/3">
                      <div>
                        <h3 className="text-xl font-nunito text-[#562b00]">Pontuação</h3>
                        <p className="text-sm text-gray-900">{user.score}</p>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-xl font-nunito text-[#562b00]">Grupo</h3>
                        <p className="text-sm text-gray-900">
                          {user.groupId || "O usuario nao participa de nenhum grupo"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Container dos livros com largura reduzida e alinhado à esquerda */}
              <div className="mt-12 p-6 bg-gray-500/50 rounded-md border border-gray-400 w-1/2 self-start">
                {/* Seção para Leitura Atual */}
                <h2 className="text-2xl font-nunito text-[#562b00] mb-4">Leitura Atual</h2>
                {user.currentBookTitle ? (
                  <div className="flex items-center space-x-4">
                    {user.currentBookCover && (
                      <img
                        src={user.currentBookCover}
                        alt="Capa do livro atual"
                        className="w-24 h-auto object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="text-sm text-gray-900">
                        <strong>Título:</strong> {user.currentBookTitle}
                      </p>
                      {user.currentBookAuthor && (
                        <p className="text-sm text-gray-900">
                          <strong>Autor:</strong> {user.currentBookAuthor}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-700 italic">Nenhuma leitura atual registrada.</p>
                )}

                {/* Seção para Top 3 Livros */}
                <div className="mt-8">
                  <h2 className="text-2xl font-nunito text-[#562b00] mb-4">Top 3 Livros</h2>
                  {user.topBook1Title || user.topBook2Title || user.topBook3Title ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((index) => {
                        const bookTitle = user[`topBook${index}Title`];
                        const bookCover = user[`topBook${index}Cover`];
                        const bookAuthor = user[`topBook${index}Author`];

                        return bookTitle ? (
                          <div key={index} className="flex flex-col items-center space-y-2">
                            {bookCover && (
                              <img
                                src={bookCover}
                                alt={`Capa do Top Livro ${index}`}
                                className="w-24 h-auto object-cover rounded"
                              />
                            )}
                            <p className="text-sm text-gray-900 text-center">
                              <strong>{bookTitle}</strong>
                            </p>
                            {bookAuthor && (
                              <p className="text-sm text-gray-900 text-center">{bookAuthor}</p>
                            )}
                          </div>
                        ) : null;
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-700 italic">Nenhum livro favorito registrado.</p>
                  )}
                </div>
              </div>
              {/* Fim do container dos livros */}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ShowProfilePage;
