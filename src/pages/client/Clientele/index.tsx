import ClientCard from '../../../components/ClientCard/ClientCard';
import Title from '../../../components/Title/Title';
import useGetVendorsById from '../../../services/queries/useGetVendorsById';
import { ILinkedEntity } from '../../../types/clientMapping';

const Clientele = () => {
  const {
    data: clientele,
    isLoading: isClienteleLoading,
    isSuccess,
  } = useGetVendorsById();

  console.log('===========cli', clientele?.data);

  return (
    <>
      <Title text="Vendors" variant="h1" />
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
