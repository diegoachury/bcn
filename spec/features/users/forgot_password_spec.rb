require 'rails_helper'

describe 'Forgotten passwords' do
  let!(:user) {create(:user)}

  it 'sends a user an email' do
    visit login_path
    click_link 'Forgot Password?'
    fill_in 'Email', with: user.email

    expect {
      click_button 'Reset Password'
    }.to change{ ActionMailer::Base.deliveries.size }.by(1)
  end

  it 'resets a password when following the email link' do
    visit login_path
    click_link 'Forgot Password?'
    fill_in 'Email', with: user.email
    click_button 'Reset Password'

    open_email(user.email)
    current_email.click_link 'Change Password'
    expect(page).to have_content('Update Your Password')

    fill_in 'Password', with: 'balls'
    click_button 'Update Password'

    expect(page).to have_content('Password updated')
    expect(page.current_path).to eq(home_path)

    click_link 'Log Out'
    visit login_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: 'balls'
    click_button 'Log In'
    expect(page).to have_content("Welcome #{user.first_name}")
  end
end