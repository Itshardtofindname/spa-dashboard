import LksHeader from './LksHeader';
import StoreSelector from './StoreSelector';
import SelectedStoreCard from './SelectedStoreCard';
import RegionalTargetTable from './RegionalTargetTable';
import TargetL2Table from './TargetL2Table';
import TargetL4Table from './TargetL4Table';
import PromoPrograms from './PromoPrograms';
import ActionChecklist from './ActionChecklist';
import LksFooterNav from './LksFooterNav';

export default function LembarKerjaSalesman() {
  return (
    <div className="space-y-4">
      <LksHeader />
      <StoreSelector />
      <SelectedStoreCard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <div className="lg:col-span-2 space-y-4">
          <RegionalTargetTable />
          <TargetL2Table />
          <TargetL4Table />
        </div>

        <div className="space-y-4">
          <PromoPrograms />
          <ActionChecklist />
        </div>
      </div>

      <LksFooterNav />
    </div>
  );
}