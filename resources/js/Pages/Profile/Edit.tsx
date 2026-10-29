import React, { useState, FormEventHandler, useRef } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import ClientLayout, { useAurelia } from '@/Layouts/ClientLayout';
import ProductImagePlaceholder from '@/Components/ProductImagePlaceholder';
import Modal from '@/Components/Modal';
import { PageProps } from '@/types';

interface OrderItem {
  id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  is_preorder?: boolean;
  product?: {
    id: number;
    name: string;
    image_url?: string | null;
    category?: {
      id: number;
      name: string;
    };
  };
}

interface Order {
  id: number;
  order_number: string;
  total_amount: number | string;
  status: string;
  shipping_address: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

interface ProfileProps extends Record<string, unknown> {
  mustVerifyEmail: boolean;
  status?: string;
  orders?: Order[];
  cartCount?: number;
}

export default function Edit(props: PageProps<ProfileProps>) {
  const pageProps = usePage().props;
  const auth = props.auth || pageProps.auth;

  return (
    <ClientLayout auth={auth} cartCount={props.cartCount || 0}>
      <ProfileContent {...props} />
    </ClientLayout>
  );
}

function ProfileContent({
  mustVerifyEmail,
  status,
  orders = [],
}: PageProps<ProfileProps>) {
  const { auth } = usePage().props;
  const user = auth.user;
  const { t, lang } = useAurelia();
  const p = t.profilePage;
  const locale = lang === 'eng' ? 'en-US' : lang === 'esp' ? 'es-ES' : 'fr-FR';

  const [activeTab, setActiveTab] = useState<'orders' | 'info' | 'security' | 'danger'>('orders');

  // --- Profile Info Form ---
  const infoForm = useForm({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
  });

  const submitInfo: FormEventHandler = (e) => {
    e.preventDefault();
    infoForm.patch(route('profile.update'), {
      preserveScroll: true,
    });
  };

  // --- Password Form ---
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const passwordForm = useForm({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submitPassword: FormEventHandler = (e) => {
    e.preventDefault();
    passwordForm.put(route('password.update'), {
      preserveScroll: true,
      onSuccess: () => passwordForm.reset(),
      onError: (err) => {
        if (err.password) {
          passwordForm.reset('password', 'password_confirmation');
          newPasswordRef.current?.focus();
        }
        if (err.current_password) {
          passwordForm.reset('current_password');
          currentPasswordRef.current?.focus();
        }
      },
    });
  };

  // --- Delete Account Form ---
  const [confirmingDeletion, setConfirmingDeletion] = useState(false);
  const deletePasswordRef = useRef<HTMLInputElement>(null);

  const deleteForm = useForm({
    password: '',
  });

  const submitDelete: FormEventHandler = (e) => {
    e.preventDefault();
    deleteForm.delete(route('profile.destroy'), {
      preserveScroll: true,
      onSuccess: () => setConfirmingDeletion(false),
      onError: () => deletePasswordRef.current?.focus(),
      onFinish: () => deleteForm.reset(),
    });
  };

  // Metrics
  const totalOrders = orders.length;
  const activeOrders = orders.filter(
    (o) => o.status !== 'reçu' && !o.status.includes('annulé')
  ).length;
  const totalSpent = orders
    .reduce((sum, o) => sum + parseFloat(String(o.total_amount || 0)), 0)
    .toFixed(2);

  // Status Badge Colors & Labels
  const getStatusStyle = (statusKey: string) => {
    if (statusKey.includes('annulé')) {
      return { bg: '#FEE2E2', color: '#991B1B', border: '#FECACA' };
    }
    if (statusKey === 'reçu') {
      return { bg: '#D1FAE5', color: '#065F46', border: '#A7F3D0' };
    }
    if (statusKey === 'confirmé') {
      return { bg: '#DBEAFE', color: '#1E40AF', border: '#BFDBFE' };
    }
    if (statusKey === 'livré') {
      return { bg: '#EDE9FE', color: '#5B21B6', border: '#DDD6FE' };
    }
    return { bg: '#FEF3C7', color: '#92400E', border: '#FDE68A' };
  };

  const userInitials = (user.name || 'Client')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0].toUpperCase())
    .join('');

  return (
    <>
      <Head title={`${p.title} · Ourélia`} />
      <div className="au-container au-profile-section">
        {/* Header Profile Banner */}
        <div className="au-profile-header">
          <div className="au-profile-user-info">
            <div className="au-profile-avatar">{userInitials}</div>
            <div>
              <h1 className="au-profile-name">{p.welcomeBack(user.name)}</h1>
              <div className="au-profile-meta">
                <span>{user.email}</span>
                {user.phone && <span>• {user.phone}</span>}
                <span className="au-profile-meta-tag">{p.memberTag}</span>
              </div>
            </div>
          </div>

          <div className="au-profile-stats">
            <div className="au-profile-stat-box">
              <div className="au-profile-stat-val">{totalOrders}</div>
              <div className="au-profile-stat-lbl">{p.tabOrders}</div>
            </div>
            <div className="au-profile-stat-box">
              <div className="au-profile-stat-val">{activeOrders}</div>
              <div className="au-profile-stat-lbl">{p.activeOrdersLabel}</div>
            </div>
            <div className="au-profile-stat-box">
              <div className="au-profile-stat-val" style={{ color: 'var(--au-gold)' }}>
                {totalSpent} <span style={{ fontSize: '13px' }}>DH</span>
              </div>
              <div className="au-profile-stat-lbl">{p.orderTotal}</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="au-profile-tabs">
          <button
            type="button"
            className={`au-profile-tab-btn${activeTab === 'orders' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M6 8h12l-1 12H7L6 8z" />
              <path d="M9 8a3 3 0 0 1 6 0" />
            </svg>
            <span>{p.tabOrders}</span>
            {totalOrders > 0 && (
              <span
                style={{
                  background: activeTab === 'orders' ? 'var(--au-gold)' : 'var(--au-border)',
                  color: activeTab === 'orders' ? '#fff' : 'var(--au-text-muted)',
                  fontSize: '11px',
                  padding: '2px 7px',
                  borderRadius: '999px',
                  fontWeight: 600,
                }}
              >
                {totalOrders}
              </span>
            )}
          </button>

          <button
            type="button"
            className={`au-profile-tab-btn${activeTab === 'info' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <span>{p.tabInfo}</span>
          </button>

          <button
            type="button"
            className={`au-profile-tab-btn${activeTab === 'security' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>{p.tabSecurity}</span>
          </button>

          <button
            type="button"
            className={`au-profile-tab-btn${activeTab === 'danger' ? ' is-active' : ''}`}
            onClick={() => setActiveTab('danger')}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <span>{p.tabDanger}</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div
                className="au-profile-card"
                style={{
                  textAlign: 'center',
                  padding: '64px 24px',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto 20px',
                    borderRadius: '50%',
                    background: 'var(--au-bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--au-gold)',
                  }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path d="M6 8h12l-1 12H7L6 8z" />
                    <path d="M9 8a3 3 0 0 1 6 0" />
                  </svg>
                </div>
                <h3 className="au-profile-card-title">{p.noOrders}</h3>
                <p className="au-profile-card-desc" style={{ maxWidth: '420px', margin: '0 auto 24px' }}>
                  {p.subtitle}
                </p>
                <Link href="/#collection" className="au-btn-gold">
                  {p.shopNow}
                </Link>
              </div>
            ) : (
              <div>
                {orders.map((order) => {
                  const badge = getStatusStyle(order.status);
                  const statusDisplay = p.statusLabels[order.status] || order.status;
                  const formattedDate = new Date(order.created_at).toLocaleDateString(locale, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  });

                  return (
                    <div key={order.id} className="au-order-card">
                      <div className="au-order-top">
                        <div className="au-order-top-left">
                          <div className="au-order-id-row">
                            <span className="au-order-num">
                              {order.order_number}
                            </span>
                            <span
                              className="au-order-status-badge"
                              style={{
                                backgroundColor: badge.bg,
                                color: badge.color,
                                border: `1px solid ${badge.border}`,
                              }}
                            >
                              {statusDisplay}
                            </span>
                          </div>
                          <div className="au-order-date">
                            {p.orderDate}: {formattedDate}
                          </div>
                        </div>

                        <div className="au-order-top-right">
                          <span className="au-order-total-lbl">
                            {p.orderTotal}
                          </span>
                          <div className="au-order-total-val">
                            {order.total_amount} <span style={{ fontSize: '13px' }}>DH</span>
                          </div>
                        </div>
                      </div>

                      <div className="au-order-body">
                        {order.items && order.items.length > 0 && (
                          <div className="au-order-items-list">
                            {order.items.map((item) => (
                              <div key={item.id} className="au-order-item-row">
                                {item.product?.image_url ? (
                                  <img
                                    src={item.product.image_url}
                                    alt={item.product.name}
                                    className="au-order-item-img"
                                  />
                                ) : (
                                  <ProductImagePlaceholder
                                    category={item.product?.category?.name}
                                    productName={item.product?.name}
                                    size="sm"
                                    className="au-order-item-img"
                                  />
                                )}

                                <div className="au-order-item-details">
                                  <div className="au-order-item-title">
                                    {item.product?.name || p.productFallback}
                                  </div>
                                  <div className="au-order-item-sub">
                                    <span>{item.quantity} × {item.unit_price} DH</span>
                                    {item.is_preorder && (
                                      <span className="au-order-item-preorder">
                                        {p.preorderBadge}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="au-order-item-price">
                                  {(item.quantity * item.unit_price).toFixed(2)} DH
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {order.shipping_address && (
                          <div className="au-order-address-box">
                            <strong style={{ color: 'var(--au-ink)' }}>{p.orderAddress}:</strong>{' '}
                            {order.shipping_address}
                          </div>
                        )}
                      </div>

                      <div className="au-order-footer">
                        <span className="au-order-count">
                          {p.articlesCount(order.items?.length || 0)}
                        </span>

                        <a
                          href={route('profile.order.ticket', order.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="au-btn-ghost au-order-ticket-btn"
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{p.downloadTicket}</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Personal Information */}
        {activeTab === 'info' && (
          <div className="au-profile-card">
            <h2 className="au-profile-card-title">{p.infoTitle}</h2>
            <p className="au-profile-card-desc">{p.infoSubtitle}</p>

            {infoForm.recentlySuccessful && (
              <div
                className="au-flash au-flash-success"
                style={{
                  background: '#D1FAE5',
                  color: '#065F46',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: '1px solid #A7F3D0',
                }}
              >
                {p.savedSuccess}
              </div>
            )}

            <form onSubmit={submitInfo} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '580px' }}>
              <div>
                <label className="au-label" htmlFor="profile-name">
                  {p.fullName} *
                </label>
                <input
                  id="profile-name"
                  type="text"
                  className="au-input"
                  value={infoForm.data.name}
                  onChange={(e) => infoForm.setData('name', e.target.value)}
                  required
                />
                {infoForm.errors.name && (
                  <p className="au-field-error">{infoForm.errors.name}</p>
                )}
              </div>

              <div>
                <label className="au-label" htmlFor="profile-email">
                  {p.emailAddress} *
                </label>
                <input
                  id="profile-email"
                  type="email"
                  className="au-input"
                  value={infoForm.data.email}
                  onChange={(e) => infoForm.setData('email', e.target.value)}
                  required
                />
                {infoForm.errors.email && (
                  <p className="au-field-error">{infoForm.errors.email}</p>
                )}
              </div>

              {mustVerifyEmail && user.email_verified_at === null && (
                <div
                  style={{
                    background: '#FEF3C7',
                    border: '1px solid #FDE68A',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    color: '#92400E',
                  }}
                >
                  <p>{p.emailUnverified}</p>
                  <Link
                    href={route('verification.send')}
                    method="post"
                    as="button"
                    className="au-auth-link"
                    style={{ marginTop: '6px', display: 'inline-block' }}
                  >
                    {p.resendVerification}
                  </Link>

                  {status === 'verification-link-sent' && (
                    <div style={{ marginTop: '6px', fontWeight: 600, color: '#065F46' }}>
                      {p.verificationSent}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="au-label" htmlFor="profile-phone">
                  {p.phoneLabel}
                </label>
                <input
                  id="profile-phone"
                  type="tel"
                  className="au-input"
                  placeholder={p.phonePlaceholder}
                  value={infoForm.data.phone}
                  onChange={(e) => infoForm.setData('phone', e.target.value)}
                />
                <p style={{ fontSize: '11px', color: 'var(--au-text-muted)', marginTop: '4px' }}>
                  {p.phoneHelp}
                </p>
                {infoForm.errors.phone && (
                  <p className="au-field-error">{infoForm.errors.phone}</p>
                )}
              </div>

              <div style={{ paddingTop: '8px' }}>
                <button
                  type="submit"
                  disabled={infoForm.processing}
                  className="au-btn-gold"
                >
                  {infoForm.processing ? '...' : p.saveChanges}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Security & Password */}
        {activeTab === 'security' && (
          <div className="au-profile-card">
            <h2 className="au-profile-card-title">{p.securityTitle}</h2>
            <p className="au-profile-card-desc">{p.securitySubtitle}</p>

            {passwordForm.recentlySuccessful && (
              <div
                className="au-flash au-flash-success"
                style={{
                  background: '#D1FAE5',
                  color: '#065F46',
                  padding: '12px 16px',
                  borderRadius: '6px',
                  marginBottom: '20px',
                  fontSize: '13px',
                  fontWeight: 500,
                  border: '1px solid #A7F3D0',
                }}
              >
                {p.passwordUpdated}
              </div>
            )}

            <form onSubmit={submitPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '580px' }}>
              <div>
                <label className="au-label" htmlFor="current-password">
                  {p.currentPassword} *
                </label>
                <input
                  id="current-password"
                  ref={currentPasswordRef}
                  type="password"
                  className="au-input"
                  value={passwordForm.data.current_password}
                  onChange={(e) => passwordForm.setData('current_password', e.target.value)}
                  autoComplete="current-password"
                  required
                />
                {passwordForm.errors.current_password && (
                  <p className="au-field-error">{passwordForm.errors.current_password}</p>
                )}
              </div>

              <div>
                <label className="au-label" htmlFor="new-password">
                  {p.newPassword} *
                </label>
                <input
                  id="new-password"
                  ref={newPasswordRef}
                  type="password"
                  className="au-input"
                  value={passwordForm.data.password}
                  onChange={(e) => passwordForm.setData('password', e.target.value)}
                  autoComplete="new-password"
                  required
                />
                {passwordForm.errors.password && (
                  <p className="au-field-error">{passwordForm.errors.password}</p>
                )}
              </div>

              <div>
                <label className="au-label" htmlFor="confirm-password">
                  {p.confirmPassword} *
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="au-input"
                  value={passwordForm.data.password_confirmation}
                  onChange={(e) => passwordForm.setData('password_confirmation', e.target.value)}
                  autoComplete="new-password"
                  required
                />
                {passwordForm.errors.password_confirmation && (
                  <p className="au-field-error">{passwordForm.errors.password_confirmation}</p>
                )}
              </div>

              <div style={{ paddingTop: '8px' }}>
                <button
                  type="submit"
                  disabled={passwordForm.processing}
                  className="au-btn-gold"
                >
                  {passwordForm.processing ? '...' : p.updatePassword}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 4: Account Danger Zone */}
        {activeTab === 'danger' && (
          <div
            className="au-profile-card"
            style={{
              borderColor: '#FCA5A5',
              background: '#FFFDFD',
            }}
          >
            <h2 className="au-profile-card-title" style={{ color: '#991B1B' }}>
              {p.dangerTitle}
            </h2>
            <p className="au-profile-card-desc">{p.dangerSubtitle}</p>

            <button
              type="button"
              onClick={() => setConfirmingDeletion(true)}
              style={{
                background: '#EF4444',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '999px',
                fontFamily: 'var(--au-font-sans)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background .2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#DC2626')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#EF4444')}
            >
              {p.deleteAccountBtn}
            </button>

            {/* Deletion Confirmation Modal */}
            <Modal show={confirmingDeletion} onClose={() => setConfirmingDeletion(false)}>
              <form onSubmit={submitDelete} className="p-6">
                <h2 className="text-lg font-bold" style={{ color: 'var(--au-ink)', marginBottom: '8px' }}>
                  {p.confirmModalTitle}
                </h2>

                <p style={{ fontSize: '13px', color: 'var(--au-text-muted)', marginBottom: '20px' }}>
                  {p.confirmModalText}
                </p>

                <div>
                  <label className="au-label" htmlFor="delete-password">
                    {p.currentPassword}
                  </label>
                  <input
                    id="delete-password"
                    ref={deletePasswordRef}
                    type="password"
                    className="au-input"
                    value={deleteForm.data.password}
                    onChange={(e) => deleteForm.setData('password', e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  {deleteForm.errors.password && (
                    <p className="au-field-error">{deleteForm.errors.password}</p>
                  )}
                </div>

                <div className="au-modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                  <button
                    type="button"
                    onClick={() => setConfirmingDeletion(false)}
                    className="au-btn-ghost au-modal-btn"
                    style={{ padding: '10px 20px', fontSize: '12px' }}
                  >
                    {p.cancelBtn}
                  </button>

                  <button
                    type="submit"
                    disabled={deleteForm.processing}
                    className="au-modal-btn"
                    style={{
                      background: '#EF4444',
                      color: '#fff',
                      border: 'none',
                      padding: '10px 22px',
                      borderRadius: '999px',
                      fontFamily: 'var(--au-font-sans)',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {deleteForm.processing ? '...' : p.deleteAccountBtn}
                  </button>
                </div>
              </form>
            </Modal>
          </div>
        )}
      </div>
    </>
  );
}
