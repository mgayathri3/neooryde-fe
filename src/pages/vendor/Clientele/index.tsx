import ClientCard from '../../../components/ClientCard/ClientCard';
import ProfileCard, {
  IProfile,
} from '../../../components/ProfileCard/ProfileCard';
import Title from '../../../components/Title/Title';
import useGetClientsById from '../../../services/queries/useGetClientsById';
import { ILinkedEntity } from '../../../types/clientMapping';

const Clientele = () => {
  const {
    data: clientele,
    isLoading: isClienteleLoading,
    isSuccess,
  } = useGetClientsById();

  return (
    <>
      <Title text="Clients" variant="h1" />
      {clientele && clientele?.data?.linkedEntities.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {clientele.data.linkedEntities.map((client: ILinkedEntity) => (
            <ClientCard key={client.id} entity={client} />
          ))}
        </div>
      )}
    </>
  );
};

export default Clientele;
