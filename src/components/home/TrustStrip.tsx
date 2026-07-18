import { ShieldCheck, Clock, Users, FileText } from 'lucide-react';

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      <div className="trust-item">
        <div className="trust-icon t-gold"><ShieldCheck size={17} /></div>
        <span className="trust-text"><strong>Enrolled</strong> &mdash; Bar Council of UP</span>
      </div>
      <div className="trust-item">
        <div className="trust-icon t-blue"><Clock size={17} /></div>
        <span className="trust-text"><strong>Quick Response</strong> &mdash; Within 2 Hours</span>
      </div>
      <div className="trust-item">
        <div className="trust-icon t-navy"><Users size={17} /></div>
        <span className="trust-text"><strong>500+ Clients</strong> Served</span>
      </div>
      <div className="trust-item">
        <div className="trust-icon t-gold"><FileText size={17} /></div>
        <span className="trust-text"><strong>Transparent</strong> Fees</span>
      </div>
    </div>
  );
}
